class ProceduresController < ApplicationController
	include ActiveStorage::Downloading

	before_action :require_login

	# GET /operators/:id/procedures
	# return procedures sorted by most recently used
	def operator_prod_index
		# operator itself, OA and Oem associated to operator
		operator = Operator.find(params[:id])
		oemb = OemBusiness.find(operator.oem_business_id)
		arr_of_oa = oemb.operator_admins.pluck(:id)

		if !( is_p_admin?  || cuser_is?("Operator", params[:id]) || cuser_is_in?("OperatorAdmin", arr_of_oa) || cuser_is?("Oem", oemb.oem_id))
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		operations = Operation.where(operator_id: params[:id])
		sorted_op = (operations.sort_by &:last_used).reverse
		# returns an array of the procedures in the sorted operations
		pcd_arr = sorted_op.pluck(:procedure_id)
		@procedures = Procedure.find(pcd_arr)
	end

	# GET /oem_businesses/:id/procedures
	# return procedures of the oem_business, sorted alphabetically
	def oembusiness_prod_index
		# oem associated to oem_business
		oemb = OemBusiness.find(params[:id])
		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id) || is_author? || is_operator? || is_client_admin?)
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		@procedures = (oemb.procedures).sort_by &:name
	end

	# GET /procedures/:id
	# also returns associated steps
	def show
		@procedure = Procedure.find(params[:id])
		arr_of_oa = Array.new
		@procedure.oem_businesses.map do |oem_business|
			tmp_arr_of_oa = oem_business.operator_admins.pluck(:id)
			arr_of_oa = arr_of_oa + tmp_arr_of_oa
		end
		arr_of_oem = Array.new
		@procedure.oem_businesses.map do |oem_business|
			arr_of_oem << oem_business.oem_id
		end
		# have to check if procedure belongs to operator
		# operator can access its associated procedures, OA and and Oem associated to procedures
		if !( is_p_admin? \
			|| cuser_is?("Oem", arr_of_oem) \
			|| is_author? \
			|| is_operator? \
			|| is_client_admin? \
			|| cuser_is?("Oem", arr_of_oem) \
			|| cuser_is?("OperatorAdmin", arr_of_oa) \
		)
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		begin
			@steps = Step.find(@procedure.steps_order)
		rescue ActiveRecord::RecordNotFound
			
		end
		#@steps = Step.includes(:visuals).find(@procedure.steps_order)
		#json output defined in app/views/procedures/show.json.jb
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

	#JDT uncommented update code
	 def update

		 @procedure = Procedure.find(params[:id])
		 if(@procedure.update_attributes(procedure_params))
			# do we need to update steps too?
			 #render json: @procedure, status: :ok
			 @steps = @procedure.steps
			 render "show", status: :ok
	 	else
	 		head :bad_request
	 	end
	 end
	# end uncomment

	# PUT /procedures/:id/update_categories
	def update_categories
		@procedure = Procedure.find(params[:id])
		if (@procedure)
			@procedure.oem_businesses.clear
			params[:categories].each do |c_id|
				oem_business = OemBusiness.find(c_id)
				@procedure.oem_businesses << oem_business
			end
			@procedure.save
			#render json: @procedure, status: :ok
			@steps = @procedure.steps
			render "show", status: :ok
		else
			head :bad_request
		end
	end

	# DELETE /procedures/:id
	def destroy
		@procedure = Procedure.find(params[:id])
		if @procedure.destroy
			render json: { "id": params[:id]}, status: :ok
	 	else
	 		head :bad_request
		end
	end

	# PUT /procedures/:id/reorder
	def reorder
		# oem associated and padmin

		@procedure = Procedure.find(params[:id])
		so_arr = params[:procedure][:steps_order].split(",").map(&:to_i)
		pso = @procedure.steps_order
		# make sure the reordered array has the same elements
		
		#if !( (pso - so_arr).blank? and (so_arr.size == pso.size) )
		#	render json:
		#	{ "error": "reordered steps_order doesn't have the same elements as the original" } ,status: :bad_request
		#	return
		#end
		
		@procedure.steps_order = so_arr
		@procedure.save
		head :ok

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

		def procedure_params
			#params.require(:procedure).permit(:name, :version, :description, :category, :author, :language, :oem_business_id)
			params.require(:procedure).permit(:name, :version, :description, :category, :author, :language)
		end

		def step_params(index)
			#JDT params.require(:steps)[index].permit(:title, :device, :location, :note, :safety, visuals: [], :mode, :time, :parameter)
			params.require(:steps)[index].permit(:title, :device_id, :location, :note, :safety, :mode, :time, :parameter_name, :parameter_value_8_pack, :spoken, visuals: [])
		end
		
end
