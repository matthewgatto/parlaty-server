class OemsController < ApplicationController

	# PUT /oems/:id
	def update
		if !(current_user.roleable_type == "ParlatyAdmin")
			render json: {"error": "Current user not an ParlatyAdmin"}, status: :forbidden and return
		end

		@oem = Oem.find(params[:id])

		if(@oem.user.update_attributes(update_oem_params))
			head :ok
		else
			render json: { "error": @oem.errors.full_messages }, status: :bad_request
		end
	end


	private
	def update_oem_params
		params.require(:oem).permit(:email, :name, :password)
	end

end
