class SessionsController < ApplicationController

	# POST /login
	def create
		@user = User.find_by(email: params[:email])

		# checks if user exist, and valid password (devise's method)
		if @user && @user.valid_password?(params[:password])
			@role = @user.roleable
			if deactivated?()
				render json: {"error": "User has been deactivated"}, status: :unauthorized and return
			else
				@jwt = Auth.encode({ uid: @user.id})
				
				begin
					if (@user.roleable_type == "Author" or @user.roleable_type == "Operator")
						@sorted_ob = @user.roleable.oem_businesses.sort_by &:name	
					elsif 
						oem = Oem.find(@user.roleable_id)
						if oem
							oem_bus = oem.oem_businesses
							@sorted_ob = oem_bus.sort_by &:name
						end
					end
				rescue ActiveRecord::RecordNotFound
					@sorted_ob = {}
				end
				@devices = Device.all().sort_by &:name
			end
		else
			head :unauthorized
		end
	end

	private

	def deactivated?
		@user.roleable.deactivated if @user.operator?
	end

end
