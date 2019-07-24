class ProceduresController < ApplicationController
	before_action :require_login

	# GET /operators/:id/procedures
	# return procedures sorted by most recently used
	def operator_index
		# make sure current user has access
		# operator can access itself, 
		operations = Operation.where(operator_id: params[:id])
		sorted_op = (operations.sort_by &:last_used).reverse
		# returns an array of the procedures in the sorted operations
		pcd_arr = sorted_op.pluck(:procedure_id)
		@procedures = Procedure.find(pcd_arr)
	end

	# GET /oembusinesses/:id/procedures
	# return procedures of the oem_business, sorted alphabetically
	def oembusiness_index
		oem_bus = OemBusiness.find(params[:id])
		@procedures = (oem_bus.procedures).sort_by &:name
	end
	
	# GET /procedures/:id
	# also returns associated steps
	def show
		# check that current_user has access to procedures
		# operator can access its associated procedures, OA can access it's oem_business's operators

		@procedure = Procedure.find(params[:id])
		@steps = Step.find(@procedure.steps_order)
		#json output defined in app/views/procedures/show.json.jb
	end

	# POST /procedures
	#inlcude creating steps
	def create
		# if !(current_user.roleable_type == "Oem" or current_user.roleable_type == "ParlatyAdmin")
		# 	render json: {"error": "Current user not an Oem or ParlatyAdmin"}, status: :forbidden and return
		# end

		# check that oem business belongs to oem??

		if !(OemBusiness.exists?(id: params[:procedure][:oem_business_id]))
			render json: { "error": "OemBusiness Id doesn't exist"}, status: :bad_request and return
		end		

		@procedure = Procedure.new(procedure_params)

		count = 0
		while count < params[:steps].count
			step = @procedure.steps.build(step_params(count))
			step.save
			@procedure.steps_order.push(step.id)
			count = count + 1
		end

		if(@procedure.save)
			head :ok
		else
			render json: { "error": @procedure.errors.full_messages }, status: :bad_request
		end
	end


	# def update

	# 	@procedure = Procedure.find(params[:id])
	# 	if(@procedure.update_attributes(procedure_params))
	# 		render json: @procedure, status: :ok
	# 	else
	# 		head :bad_request
	# 	end
	# end

	# def destroy
	# 	@procedure = Procedure.find(params[:id])
	# 	if(@procedure.delete)
	# 		head :ok
	# 	else
	# 		head :bad_request
	# 	end
	# end

	# PUT /procedures/:id/reorder
	def reorder
		if !(current_user.roleable_type == "Oem" or current_user.roleable_type == "ParlatyAdmin")
			render json: {"error": "Current user not an Oem or ParlatyAdmin"}, status: :forbidden and return
		end
		# check that procedure belongs to oem??

		@procedure = Procedure.find(params[:id])
		so_arr = params[:procedure][:steps_order].split(",").map(&:to_i)
		pso = @procedure.steps_order
		# make sure the reordered array has the same elements
		if !( (pso - so_arr).blank? and (so_arr.size == pso.size) )
			render json: 
			{ "error": "reordered steps_order doesn't have the same elements as the original" } ,status: :bad_request
			return 
		end
		@procedure.steps_order = so_arr
		@procedure.save
		head :ok

	end

	# PUT /procedures/:id/used
	def used
		if(current_user.roleable_type != "Operator")
			render json: { "error": "Current user not an Operator" }, status: :forbidden and return
		end

		op = Operation.where(procedure_id: params[:id], operator_id: current_user.roleable_id).first
		op.last_used = Time.now
		op.save
		render json: {"Updated Time": op.last_used}, status: :ok
	end

	private

		def procedure_params
			params.require(:procedure).permit(:name, :version, :description, :category, :author, :language, :oem_business_id)
		end

		def step_params(index)
			params.require(:steps)[index].permit(:title, :device, :location, :note)
		end
end
