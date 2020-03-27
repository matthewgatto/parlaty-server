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
					#oem = Oem.find(@user.id)
					puts "*** @user.roleable_id: " + @user.roleable_id.to_s
					oem = Oem.find(@user.roleable_id)
					puts "*** oem: " + oem.inspect
					if oem
						oem_bus = oem.oem_businesses
						@sorted_ob = oem_bus.sort_by &:name
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

	# false if not Operator or OperatorAdmin
	def deactivated?()
		urt = @user.roleable_type

		if(urt == "Operator" or urt == "OperatorAdmin")
			return @role.deactivated
		end

		return false
	end

end
