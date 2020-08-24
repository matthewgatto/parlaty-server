class ApplicationController < ActionController::API
	respond_to :json
	include RequireLogin

	def current_user
		if @user_id
			@current_user ||= User.find(@user_id)
		else
			head :unauthorized
		end
	end
end


