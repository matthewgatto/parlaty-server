class UsersController < ApplicationController
  before_action :require_login

  # GET /users
  def index
    authorize User
    render json: UserSerializer.users_as_json(current_user), status: :ok
  end

  # GET /users/:id
  def show
    @user = User.find(params[:id])
    authorize @user
    render json: UserSerializer.user_as_json(@user), status: :ok
  end

  # POST /users
  def create
    @user = User.new(user_params)
    authorize @user
    if @user.save
      render status: :created
    else
			render json: ApplicationSerializer.error_response(@user.errors.full_messages), status: :bad_request
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
      head :bad_request
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
    authorize @user
    (render json: ApplicationSerializer.error_response(I18n.t("errors.user.not_found")), status: :bad_request and return) if @user.blank?
    (render json: ApplicationSerializer.error_response(I18n.t("errors.user.deactivated")), status: :bad_request and return) if deactivated?
    jwt = Auth.encode({ uid: @user.id})
    render json: UserSerializer.refresh_user_as_json(@user, jwt), status: :ok
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
    params.require(:user).permit(policy(@user || User.new).permitted_attributes)
  end

	def deactivated?
    @user.roleable.deactivated if @user.operator?
	end

end
