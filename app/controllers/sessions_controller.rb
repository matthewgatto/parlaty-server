class SessionsController < ApplicationController
	
	# POST /login
	def create
		@user = User.find_by(email: params[:email])

		# checks if user exist, and valid password (devise's method)
		if @user && @user.valid_password?(params[:password])
			@role = @user.roleable
			if @role.deactivated
				render json: {"error": "User has been deactivated"}, status: :unauthorized and return 
			else
				@jwt = Auth.encode({ uid: @user.id})
			end
		else
			head :unauthorized
		end
	end

	
end
