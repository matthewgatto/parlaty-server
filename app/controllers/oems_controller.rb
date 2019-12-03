class OemsController < ApplicationController
	before_action :require_login

  # GET /oems
  def index
		#padmin

		if !is_p_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		@user_id = current_user.id

		@oems = Oem.all()

		#render json: {"oems":[{"name":"OEM 1","oem_id":1,"user_id":@user_id},{"name":"OEM2","oem_id":2,"user_id":@user_id}]}, status: :ok
		render json: @oems, status: :ok
	end

	# PUT /oems/:id
	def update
		#padmin

		if !is_p_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
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
