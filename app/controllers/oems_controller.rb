class OemsController < ApplicationController
	def index
		@oems = Oem.all
		render json: @oems
	end

	def show
		@oem = Oem.find(params[:id])
		render json: @oem
	end

	def create
		@oem = Oem.new(oem_params)

		if(@oem.save)
			render json: @oem, status: :created
		else
			head :bad_request
		end

	end

	def update
		@oem = Oem.find(params[:id])
		if(@oem.update_attributes(oem_params))
			render json: @oem, status: :ok
		else
			head :bad_request
		end
	end


	private

		def oem_params
			params.require(:oem).permit(:name, :email, :password, :password_confirmation)
		end
end
