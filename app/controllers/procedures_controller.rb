class ProceduresController < ApplicationController
	def index
		@procedures = Procedure.all
		render json: @procedures
	end

	def show
		@procedure = Procedure.find(params[:id])
		render json: @procedure
	end

	def create
		@procedure = Procedure.new(procedure_params)

		if(@procedure.save)
			render json: @procedure, status: :created
		else
			head :bad_request
		end

	end

	def update
		@procedure = Procedure.find(params[:id])
		if(@procedure.update_attributes(procedure_params))
			render json: @procedure, status: :ok
		else
			head :bad_request
		end
	end

	def destroy
		@procedure = Procedure.find(params[:id])
		if(@procedure.delete)
			head :ok
		else
			head :bad_request
		end
	end

	private

		def procedure_params
			params.require(:procedure).permit(:name, :version, :description, :category, :author, :language)
		end
end
