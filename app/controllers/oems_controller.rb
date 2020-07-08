class OemsController < ApplicationController
	before_action :require_login

  # GET /oems
  def index
		unless is_p_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		@user_id = current_user.id
		@oems = Oem.all
		#render json: {"oems":[{"name":"OEM 1","oem_id":1,"user_id":@user_id},{"name":"OEM2","oem_id":2,"user_id":@user_id}]}, status: :ok
		render json: @oems, status: :ok
	end

	# PUT /oems/:id
	def update
		if !is_p_admin? && !is_client_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		@oem = Oem.find(params[:id])
		if @oem.update_attributes(oem_params)
			head :ok
		else
			render json: { "error": @oem.errors.full_messages }, status: :bad_request
		end
	end

	# POST /oems
	def create
		unless is_p_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		name = params[:name]
		@oem = Oem.create!(oem_params)
		render json: {"oem": { "id": @oem.id, "name": @oem.name }}, status: :ok
	end

	# DELETE /oems/:id
	def destroy
		#byebug
		@oem = Oem.find(params[:id])
		if @oem.present? && delete_oem(@oem)
			render json: { "id": params[:id]}, status: :ok
		else
			head :bad_request
		end
	end

	private

	def oem_params
		params.require(:oem).permit(:name)
	end

end
