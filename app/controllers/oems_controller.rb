class OemsController < ApplicationController
	before_action :require_login

	# PUT /oems/:id
	def update
		if !(current_user.roleable_type == "ParlatyAdmin")
			render json: {"error": "Current user not an ParlatyAdmin"}, status: :forbidden and return
		end

		@oem = Oem.find(params[:id])

		if(@oem.user.update_attributes(update_oem_params) && @oem.update_attributes(name: params[:oem][:name]))
			head :ok
		else
			render json: { "error": @oem.errors.full_messages }, status: :bad_request
		end
	end


	private
	def update_oem_params
		params.require(:oem).permit(:email, :password)
	end

end
