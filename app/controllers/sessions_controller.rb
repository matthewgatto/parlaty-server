class SessionsController < ApplicationController
	
	# POST /login
	def create
		user = User.find_by(email: params[:email])

		# checks if user exist, and valid password (devise's method)
		if user && user.valid_password?(params[:password])
			jwt = Auth.encode({ uid: user.id})
			render json: jwt
		else
			head :unauthorized
		end
	end

	
end
