require 'csv'
require 'uri'

class StepsController < ApplicationController
	before_action :require_login

	# POST /steps
	def create
		@step = Step.new(step_params)
		@procedure = Procedure.find(@step.procedure_id)
		prev_si = params[:previous_step_id].to_i
		pso = @procedure.steps_order

		#zero means step is first order
		if !(pso.include? prev_si or prev_si == 0)
			render json: { "error": "previous step id doesn't exist in procedure_id" }, status: :bad_request and return
		end

		if(@step.save)
			if(prev_si== 0)
				pso.push(@step.id)
			else
				i = pso.index(prev_si)
				pso.insert(i+1, @step.id)
			end
			@step.has_visual = (@step.visuals.count > 0)
			@step.save

			step_device_id = params[:step][:device_id]
			step_device_actions = params[:step][:actions]
			step_id = @step.id
			count = 0
			while step_device_actions && count < step_device_actions.count
				actionParams = action_params(count)
				actionId = actionParams[:id]
				actionValue = actionParams[:parameter_value_8_pack]
				actionMode = actionParams[:mode]
				actionTime = actionParams[:time]
				action = Action.find(actionId)
				if (action)
				  	if(action.update_attributes(actionParams))
					else
					  config.logger.error "action update attributes failed in PUT /steps/:id"
					  head :bad_request and return
					end
				else
					config.logger.error "action find failed in PUT /steps/:id"
					head :bad_request and return
				end
				count = count + 1
	  		end
			# end new 20200310
			@procedure.save

			#render json: @step, status: :created
			render status: :created
		else
			render json: { "error": @step.errors.full_messages }, status: :bad_request
		end
	end

	def add_visuals
		@step = Step.find(params[:id])
		if(@step.visuals.attach(params[:visuals]))
			head :ok
		else
			render json: { "error": @step.errors.full_messages }, status: :bad_request
		end 
	end

	# PUT /steps/:id
	def update
		@step = Step.find(params[:id])
		if (@step.update_attributes(put_step_params))
			if !params[:step][:actions].nil?
				count = 0
				while count < params[:step][:actions].count
					action = Action.find(action_params(count)[:id])
					if (action)
						if (action.update_attributes(action_params(count)))
						else
						  config.logger.error "action update attributes failed in PUT /steps/:id"
						  head :bad_request and return
						end
					else
						config.logger.error "action find failed in PUT /steps/:id"
						head :bad_request and return
					end
					count = count + 1
				end
			end
			
			#byebug


			step_has_visuals_in_db = @step.visuals.attached?
			step_visuals_in_db_count = @step.visuals.count
			step_has_visuals_in_parameters = !params[:step][:visuals].nil? && params[:step][:visuals].count > 0
			step_has_visuals_in_parameters_count = params[:step][:visuals].count if step_has_visuals_in_parameters
			first_step_visual_in_parameters = params[:step][:visuals].first if step_has_visuals_in_parameters
			first_step_visual_in_parameters_is_string = first_step_visual_in_parameters.class.to_s == "String"

			
			if first_step_visual_in_parameters_is_string && step_has_visuals_in_parameters_count == step_visuals_in_db_count
				# do nothing to visuals since put is sending url strings only, no new attachment and no
				# attachment has been removed
			elsif first_step_visual_in_parameters_is_string && step_has_visuals_in_parameters_count != step_visuals_in_db_count
				@step.visuals.map do |visual|
					if first_step_visual_in_parameters.include? URI.encode(visual.blob.filename.to_s)
						# keep in db
					else
						# remove from db
						#byebug
						visual.destroy
						visual.blob.destroy
						
					end
					#puts "** end"
				end
			elsif step_has_visuals_in_parameters && step_has_visuals_in_db
				# these are new visuals so remove existing
				#byebug
				@step.visuals.purge
			elsif !step_has_visuals_in_parameters && step_has_visuals_in_db
				# there are no visuals in params so purge
				#byebug
				@step.visuals.purge
			end
			if step_has_visuals_in_parameters
				params[:step][:visuals].each do |visual|
					if visual.class.to_s != "String"
						#byebug
						@step.visuals.attach(visual)
					end
				end
			end
			@step = Step.find(params[:id])
			render status: :ok
		else
			head :bad_request
		end
	end

	# DELETE /steps/:id
	def destroy
		# oem associated, padmin
		@step = Step.find(params[:id])
		step_id = @step.id
		@procedure = Procedure.find(@step.procedure_id)
		if(@step.delete)
			### old code where each step had an order column ###
			# # e.g step 3 gets delete, step 4 til the last step all subtract one
			# p_id = @step.procedure_id
			# count = Procedure.find(p_id).steps.count
			# # count+1 because @step is already deleted. count will drop 1, but highest order is still old count
			# @thesteps = Step.where({order: (order+1)..count+1 , procedure_id: p_id})
			# @thesteps.map { |x| x.update_attributes(order: x.order-1) }

			# rearrange the steps order array
			so_arr = @procedure.steps_order
			so_arr.delete(step_id)
			@procedure.steps_order = so_arr
			@procedure.save
		else
			head :bad_request
		end
	end


	# POST /save_steps
	def save_step
		# oem and p admin can access
		@saved_step = Step.new(save_step_params)
		
		if(@saved_step.save)
			@saved_step.has_visual = (@step.visuals.count > 0)
			@saved_step.save
			render json: @saved_step, status: :created
		else
			render json: { "error": @saved_step.errors.full_messages }, status: :bad_request
		end
	end

	# POST /csv_steps
	def csv_steps
		file = File.read(params[:csv_steps].path)
		@table = CSV.parse(file) 
		@headers = @table.shift #remove first element of file to get the headers
	end


	# # reorder steps of a procedure
	# # have to refactor to minimize query calls
	# # have to edit code, since routes changed, no procedure id
	# def reorder
	# 	byebug 
	# 	return
	# 	main_step = Step.find(params[:step_id])
	# 	if(@step.procedure_id != params[:procedure_id])
	# 		# have to put return else will finish running the method
	# 		render json: { error: 'step does not belong to procedure' }, status: :bad_request and return 
	# 	end
	# 	#new position's node before, 0 if new position is top
	# 	new_order_previous = params[:previous_order]
	# 	procedure_id = params[:id]
	# 	order = main_step.order

	# 	change = order - (new_order_previous+1)

	# 	if(change > 0)
	# 		# if change is positive, means moved up, steps between old and new position order +1
	# 		# e.g change from order 5 to order 2, means order 2, 3, 4 all add one 
	# 		#update new position, ... excludes "order"
	# 		@thesteps = Step.where({order: (new_order_previous+1)...order, procedure_id: procedure_id})
	# 		@thesteps.map { |x| x.update_attributes(order: x.order+1) }

	# 	elsif(change < 0)
	# 		# if change is negative, means moved down, steps between old and new position order -1
	# 		# e.g from order 3 to 5, means order 4, 5 all subtract one
	# 		@thesteps = Step.where({order: (order+1)..(new_order_previous+1), procedure_id: procedure_id})
	# 		@thesteps.map { |x| x.update_attributes(order: x.order-1) }
	# 	end
	# 		main_step.update_attributes(order: order - change)
	# end

	private

		def put_step_params
			params.require(:step).permit(:id, :title, :device_id, :location, :note, :safety, :procedure_id, :mode, :time, :parameter_name, :parameter_value_8_pack, :spoken, :has_visual)
		end

		def step_params
			params.require(:step).permit(:id, :title, :device_id, :location, :note, :safety, :procedure_id, :mode, :time, :parameter_name, :parameter_value_8_pack, :spoken, :has_visual, visuals: [])
		end

		def save_step_params
			params.require(:step).permit(:title, :device_id, :location, :note, :safety, :oem_id, :mode, :time, :parameter_name, :parameter_value_8_pack, :spoken, visuals: [])
		end

		def action_params(index)
			params[:step].require(:actions)[index].permit(:id, :device_id, :name, :parameter_name, :parameter_value_8_pack, :time, :mode)
		end
		
	end
