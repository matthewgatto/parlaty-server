class SessionsController < ApplicationController

	# POST /login
	def create
		@user = User.find_by(email: params[:email])
		(head :unauthorized and return) if invalid?
		(render json: ApplicationSerializer.error_response(I18n.t("errors.user.deactivated")) and return) if deactivated?
		(render json: ApplicationSerializer.error_response(I18n.t("errors.user.web_operator")) and return) if web_operator?
		jwt = Auth.encode({ uid: @user.id})
		render json: UserSerializer.refresh_user_as_json(@user, jwt), status: :ok
	end

	private

	def invalid?
		!(@user && @user.valid_password?(params[:password]))
	end

	def deactivated?
		@user.deactivated?
	end

	def web_operator?
		params[:web_request] && @user.operator?
	end

end
