class UsersController < ApplicationController
    before_action :require_login

  # GET /users
  def index
    authorize User
    if is_client_admin?
      oem = Oem.find(current_user.roleable.oem_id)
      tmp_users = Array.new
      oem.client_admins.map do |ca|
        tmp_users << ca.user
      end
      oem.oem_businesses.map do |ob|
        ob.operator_admins.map do |oa|
          tmp_users << oa.user
        end
        ob.operators.map do |o|
          tmp_users << o.user
        end
        ob.authors.map do |a|
          tmp_users << a.user
        end
      end
      @users = tmp_users.sort_by &:email
    else
      @users = User.all()
    end
    render status: :ok
  end

  # GET /users/:id
  def show
    @user = User.find(params[:id])
    authorize @user
    @role = @user.roleable
    begin
      if (@user.roleable_type == "Author" or @user.roleable_type == "Operator")
        @sorted_ob = @user.roleable.oem_businesses.sort_by &:name	
        @sorted_ob.map do |oem_business|
          @oem = Oem.find(oem_business.oem_id)
        end
      elsif 
        @oem = Oem.find(@user.roleable_id)
        if @oem
          oem_bus = @oem.oem_businesses
          @sorted_ob = oem_bus.sort_by &:name
        end
      end
    rescue ActiveRecord::RecordNotFound
      @sorted_ob = {}
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)
    authorize @user
    if @user.save
      render status: :created
    else
      config.logger.error "user save failed in POST /devices"
			render json: { "error": @user.errors.full_messages }, status: :bad_request and return
    end
  end

  # PUT /users/:id
  def update
    @user = User.find(params[:id])
    authorize @user
    if @user.update_attributes(user_params)
      update_oem_businesses if @user.author? || @user.operator?
      render json: UserSerializer.update_user_as_json(@user), status: :ok
    else
      head :bad_request and nil
    end
end

  # DELETE /users/:id
  def destroy
    @user = User.find(params[:id])
    authorize @user
    if @user.destroy
      render json: ApplicationSerializer.delete_response(params[:id]), status: :ok
    else
 	    head :bad_request
    end
  end

  # GET /users/:id
	def refresh
		@user = User.find(params[:id])
    if (@user)
			@roleable = @user.roleable
			if deactivated?()
				render json: {"error": "User has been deactivated"}, status: :bad_request and return
			else
				@jwt = Auth.encode({ uid: @user.id})
				begin
					if (@user.roleable_type == "Author" or @user.roleable_type == "Operator")
						@sorted_ob = @user.roleable.oem_businesses.sort_by &:name	
					elsif 
						oem = Oem.find(@user.roleable_id)
						if oem
							oem_bus = oem.oem_businesses
							@sorted_ob = oem_bus.sort_by &:name
						end
					end
				rescue ActiveRecord::RecordNotFound
					@sorted_ob = {}
				end
				@devices = Device.all().sort_by &:name
			end
		else
			render json: {"error": "User not found"}, status: :bad_request and return
		end
	end

  private

  def update_oem_businesses
    role_able = @user.roleable
    role_able.oem_businesses.clear
    new_oem_businesses = params[:user][:categories]
    new_oem_businesses.map do |new_oemb_id|
      new_oemb = OemBusiness.find(new_oemb_id)
      role_able.oem_businesses << new_oemb
    end
    role_able.save
  end

  def user_params
    params.require(:user).permit(policy(@user).permitted_attributes)
  end

  	# false if not Operator or OperatorAdmin
	def deactivated?()
		urt = @user.roleable_type
    if(urt == "Operator" or urt == "OperatorAdmin")
      @role = @user.roleable
			return @role.deactivated
		end

		return false
	end

end
