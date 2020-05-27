class UsersController < ApplicationController
    before_action :require_login

  # GET /users
  def users_index
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
    id = params[:id]
    @user = User.find(id)
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
    #@oem
    #@sorted_ob

  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render status: :created
    else
      config.logger.error "user save failed in POST /devices"
			render json: { "error": @user.errors.full_messages }, status: :bad_request and return
    end
  end

  # PUT /users/:id
  def update
    id = params[:id]
    @user = User.find(id)
    @user.update_attributes(user_params)
    if @user
      @roleable = @user.roleable
      if @user.roleable_type == "Author" || @user.roleable_type == "Operator"
        @roleable.oem_businesses.clear
        new_oem_businesses = params[:user][:categories]
        new_oem_businesses.map do |new_oemb_id|
          new_oemb = OemBusiness.find(new_oemb_id)
          @roleable.oem_businesses << new_oemb
        end
        @roleable.save
      end

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

      render "refresh", status: :ok
    else
      config.logger.error "user find failed in PUT /users/:id " + id.to_s
      head :bad_request and return
    end
end

  # DELETE /users/:id
  def destroy
    @user = User.find(params[:id])
    if (@user.destroy)
      render json: { "id": params[:id]}, status: :ok
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

  def user_params
    params.require(:user).permit(:mail, :voice, :language)
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
