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

	def is_p_admin?
		return current_user.roleable_type == "ParlatyAdmin"
	end

	# check if the current_user is of that roleable id
	# return false if current_user is not of type "type"
	def cuser_is?(type, id)
		id = id.to_i
		if(current_user.roleable_type == type)
			return (current_user.roleable_id == id)
		end

		return false
	end

	def cuser_is_in?(type, arr_ids)
		if(current_user.roleable_type == type)
			return (arr_ids.include? current_user.roleable_id)
		end

		return false
	end

end


