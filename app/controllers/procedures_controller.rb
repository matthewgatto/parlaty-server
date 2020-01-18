class ProceduresController < ApplicationController
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
		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id))
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		@procedures = (oemb.procedures).sort_by &:name
	end

	# GET /procedures/:id
	# also returns associated steps
	def show
		@procedure = Procedure.find(params[:id])
		oemb = OemBusiness.find(@procedure.oem_business_id)
		arr_of_oa = oemb.operator_admins.pluck(:id)

		# have to check if prcoedure belongs to operator

		# operator can access its associated procedures, OA and and Oem associated to procedures
		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id) || cuser_is?("OperatorAdmin", arr_of_oa) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		@steps = Step.find(@procedure.steps_order)
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
	 		render json: @procedure, status: :ok
	 	else
	 		head :bad_request
	 	end
	 end
	# end uncomment

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
		# oem associated and padmin

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
		# associated operator
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
			#JDT params.require(:steps)[index].permit(:title, :device, :location, :note, :safety, visuals: [], :mode, :time, :parameter)
			params.require(:steps)[index].permit(:title, :device, :location, :note, :safety, :mode, :time, :parameter_name, :parameter_value_8_pack, visuals: [])
		end
end
