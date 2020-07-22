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
			render json: ApplicationSerializer.error_response(@user.errors.messages)
    end
  end

  # PUT /users/:id
  def update
    @user = User.find(params[:id])
    authorize @user
    if @user.update_attributes(user_params)
      @user.roleable.update_attributes(roleable_params)
      head :ok
    else
      render json: ApplicationSerializer.error_response(@user.errors.messages)
    end
end

  # DELETE /users/:id
  def destroy
    @user = User.find(params[:id])
    authorize @user
    if @user.destroy
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
 	    head :bad_request
    end
  end

  # GET /users/:id
	def refresh
		@user = User.find(params[:id])
    authorize @user
    (render json: ApplicationSerializer.error_response(I18n.t("errors.user.not_found")) and return) if @user.blank?
    (render json: ApplicationSerializer.error_response(I18n.t("errors.user.deactivated")) and return) if @user.deactivated?
    jwt = Auth.encode({ uid: @user.id})
    render json: UserSerializer.refresh_user_as_json(@user, jwt), status: :ok
	end

  private

  def roleable_params
    params.require(:user).permit(policy(@user || User.new).roleable_permitted_attributes(@user.roleable_type))
  end

  def user_params
    params.require(:user).permit(policy(@user || User.new).permitted_attributes)
  end
end
