class ApplicationController < ActionController::API
	respond_to :json

	private
	# check if user is logged in(check for token), if so assign @user_id
	def require_login
		if !request.env["HTTP_AUTHORIZATION"]
			# necessary to put return if there are still code after this method that shouldn't be run
			head :unauthorized and return
		end
		
		token_match = request.env["HTTP_AUTHORIZATION"].match(/Bearer\s(.*)/)
		if(token_match)	
			decoded = Auth.decode(token_match[1])
			@user_id = decoded["uid"]
		else
			# necessary to put return if there are still code after this method that shouldn't be run
			head :unauthorized and return
		end
	end
	
	def current_user
		@current_user ||= User.find(@user_id)
	end

	# # check if the current_user is authorized type
	# def verify_type(*args)
	# 	byebug
	# end

end


