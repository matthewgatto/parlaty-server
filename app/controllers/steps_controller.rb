class StepsController < ApplicationController
	def show
		@step = Step.find(params[:id])
		render json: @step
	end

	def create
		@step = Step.new(step_params)
		@step.procedure_id = params[:procedure_id]
	
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
			# have to reorder steps
			head :ok
		else
			head :bad_request
		end
	end


	# reorder steps of a procedure
	# have to refactor to minimize query calls
	def reorder
		main_step = Step.find(params[:step_id])
		#order of the previous step node of new position, 0 if new position is top
		new_order_previous = params[:previous_order]
		procedure_id = params[:id]
		order = main_step.order

		change = order - (new_order_previous+1)

		if(change > 0)
			# if change is positive, means moved up, steps between old and new position order +1
			# e.g change from order 5 to order 2, means order 2, 3, 4 all add one 
			#update new position, ... excludes "order"
			@thesteps = Step.where({order: (new_order_previous+1)...order, procedure_id: procedure_id})
			@thesteps.map { |x| x.update_attributes(order: x.order+1) }

		elsif(change < 0)
			# if change is negative, means moved down, steps between old and new position order -1
			# e.g from order 3 to 5, means order 4, 5 all minus one
			@thesteps = Step.where({order: (order+1)..(new_order_previous+1), procedure_id: procedure_id})
			@thesteps.map { |x| x.update_attributes(order: x.order-1) }
		end
			main_step.update_attributes(order: order - change)
	end

	private

		def step_params
			params.require(:step).permit(:title, :device, :location, :note, :order)
		end
end
