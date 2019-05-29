class StepsController < ApplicationController
	def index
		@steps = Step.all
		render json: @steps
	end

	def show
		@step = Step.find(params[:id])
		render json: @step
	end

	def create
		@step = Step.new(step_params)
	
		if(@step.save!)
			render json: @step, status: :created
		else
			head :bad_request
		end
	end

	def update
		@step = Step.find(params[:id])
		if(@step.update_attributes(step_params))
			render json: @step, status: :ok
		else
			head :bad_request
		end
	end

	def destroy
		@step = Step.find(params[:id])
		if(@step.delete)
			head :ok
		else
			head :bad_request
		end
	end

	private

		def step_params
			params.require(:step).permit(:title, :device, :location, :note, :order, :procedure_id)
		end
end
