class SessionsController < ApplicationController

	# POST /login
	def create
		@user = User.find_by(email: params[:email])
		(head :unauthorized and return) unless @user && @user.valid_password?(params[:password])
		(render json: ApplicationSerializer.error_response(I18n.t("errors.user.deactivated")), status: :bad_request and return) if deactivated?
		jwt = Auth.encode({ uid: @user.id})
		render json: UserSerializer.refresh_user_as_json(@user, jwt), status: :ok
	end

	private

	def deactivated?
		@user.roleable.deactivated if @user.operator?
	end

end
