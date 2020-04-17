class UsersController < ApplicationController
    before_action :require_login

  # GET /users
  def users_index
    @users = User.all()
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
    if @user
      render status: :ok
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

  private

  def user_params
    params.require(:user).permit(:mail)
  end

end
