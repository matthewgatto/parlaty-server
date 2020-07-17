class ProceduresController < ApplicationController
	include ActiveStorage::Downloading
	before_action :require_login
	before_action :set_params, only: %i[show update destroy reorder]

	# GET /oem_businesses/:id/procedures
	def index
		oem_business = OemBusiness.find(params[:id])
		authorize oem_business
		if permitted_user?(current_user, oem_business)
			render json: ProcedureSerializer.procedures_as_json((oem_business.procedures).sort_by &:name), status: :ok
		else
			render json: ApplicationSerializer.error_response(I18n.t("pundit.access_denied")), status: :forbidden
		end
	end

	# GET /procedures/:id
	def show
		authorize @procedure
		@steps = Step.find(@procedure.steps_order) if @procedure.steps_order.present?
		render json: ProcedureSerializer.procedure_as_json(@procedure, @steps), status: :ok
	end

	# POST /procedures
	#inlcude creating steps
	def create
		#padmin, oem associated with oem_business in json
		if !(OemBusiness.exists?(id: params[:procedure][:oem_business_id]))
			render json: { "error": "OemBusiness Id doesn't exist"}, status: :bad_request and return
		end

		@procedure = Procedure.new(procedure_params)
		@oemb = OemBusiness.find(params[:procedure][:oem_business_id])
		@oemb.procedures << @procedure
		count = 0
		while params[:steps] && count < params[:steps].count
			step = @procedure.steps.build(step_params(count))
			step.save
			if (step.visuals.count > 0)
				step.has_visual = true
				step.save
			end
			@procedure.steps_order.push(step.id)
			count = count + 1
		end

		if(@procedure.save)
			#head :ok
			render json: { "id": @procedure.id}, status: :ok
		else
			render json: { "error": @procedure.errors.full_messages }, status: :bad_request
		end
	end

	# PUT /procedures/:id/update
	 def update
		 authorize @procedure
		 if @procedure.update_attributes(procedure_params)
			 @steps = Step.find(@procedure.steps_order) if @procedure.steps_order.present?
			 render json: ProcedureSerializer.procedure_as_json(@procedure, @steps), status: :ok
	 	else
	 		head :bad_request
	 	end
	 end

	# PUT /procedures/:id/reorder
	def reorder
		authorize @procedure
		so_arr = procedure_params[:steps_order].split(",").map(&:to_i)
		@procedure.steps_order = so_arr
		@procedure.save
		head :ok
	end

	# DELETE /procedures/:id
	def destroy
		authorize @procedure
		if @procedure.destroy
			render json: ApplicationSerializer.delete_response(params[:id]), status: :ok
	 	else
	 		head :bad_request
		end
	end

	# PUT /procedures/:id/used
	def used
		# associated operator
		op = Operation.where(procedure_id: params[:id], operator_id: current_user.roleable_id).first
		op.last_used = Time.now
		op.save
		render json: {"Updated Time": op.last_used}, status: :ok
	end

	# POST /procedures/:id/copy
	def copy
		id = params[:id]
		config.logger.info "POST /procedures/:id/copy id: " + id.to_s
		procedure_original = Procedure.find(id)
		device_map = Hash.new
		step_id_map = Hash.new
		action_id_map = Hash.new
		procedure_params = params[:procedure]
		procedure_name = procedure_params[:name]
		procedure_description = procedure_params[:description]
		procedure_copy = procedure_original.dup
		procedure_copy.name = procedure_name
		procedure_copy.description = procedure_description
		procedure_copy.steps_order.clear
		procedure_copy.devices.clear
		procedure_copy.steps.clear 
		if procedure_original.operations
			procedure_original.operations.map do |operation_original|
				operation_copy = operation_original.dup
				procedure_copy.operations << operation_copy
			end
		end
		if procedure_original.devices
			procedure_original.devices.map do |device_original|
				device_copy = device_original.dup
				device_copy.actions_order.clear
				device_copy.save # need the id
				device_map[device_original] = device_copy
				if device_original.actions
					device_original.actions.map do |action_original|
						action_copy = action_original.dup
						action_copy.save # need the id
						action_id_map[action_original.id] = action_copy.id
						device_copy.actions << action_copy
					end
					if device_original.actions_order
						device_original.actions_order.map do |action_original_id|
							action_copy_id = action_id_map[action_original_id]
							device_copy.actions_order << action_copy_id
						end
					end
				end
				# device has_many steps too - might have to code for that
				procedure_copy.devices << device_copy
			end
		end
		if procedure_original.steps
			procedure_original.steps.map do |step_original|
				step_copy = step_original.dup
				step_copy.save # need the id
				step_id_map[step_original.id] = step_copy.id  
				# replace old device with new saved above
				step_copy.device = device_map[step_copy.device]
				procedure_copy.steps << step_copy
				if step_original.visuals
					step_copy.visuals.clear
					step_original.visuals.map do |visual_original|
						content_type = visual_original.blob.content_type
						binary = visual_original.download
						file = Tempfile.new('parlaty-attachment-copy-tmp')
						path = file.path
						file.close
						file = File.open(path, 'wb') # binary mode
						file.write(binary)
						file.close
						file = File.open(path, 'r') # 
						step_copy.visuals.attach( io: file, filename: path, content_type: content_type)
					end
				end
			end
		end
		if procedure_original.steps_order
			procedure_original.steps_order.map do |step_original_id|
				step_copy_id = step_id_map[step_original_id]
				procedure_copy.steps_order << step_copy_id
			end
		end
		oembs = procedure_original.oem_businesses
		oembs.map do |tmpoemb|
			tmpoemb.procedures << procedure_copy
		end
		procedure_copy.save
		render json: {"id": procedure_copy.id}, status: :ok
	end

	private

		def set_params
			@procedure = Procedure.find(params[:id])
		end

		def procedure_params
			params.require(:procedure).permit(policy(@procedure || Procedure.new).permitted_attributes)
		end

		def step_params(index)
			#JDT params.require(:steps)[index].permit(:title, :device, :location, :note, :safety, visuals: [], :mode, :time, :parameter)
			params.require(:steps)[index].permit(:title, :device_id, :location, :note, :safety, :mode, :time, :parameter_name, :parameter_value_8_pack, :spoken, visuals: [])
		end
		
end
