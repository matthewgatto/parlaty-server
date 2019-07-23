class OperatorsController < ApplicationController
	before_action :require_login

	# GET /operatoradmins/:id/operators
	def oadmin_index
		# use current login to find o_admin
		op_admin = OperatorAdmin.find(params[:id])

		# find associated operators through its oem_businesss
		@operators = op_admin.oem_business.operators

		# operators/oadmin_index.json.jb
	end

	# PUT /operators/:id
	def update
		@operator = Operator.find(params[:id])

		@operator.user.update_attributes(email: params[:operator][:email])

		@operator.update_attributes(name: params[:operator][:name])

		if(params[:operator][:procedures])
			# array of the current operator's procedures
			pro_arr = @operator.operations.pluck(:procedure_id)
			# compare and figure which procedures to associate,
			to_add = params[:operator][:procedures] - pro_arr
			# and to disassociate
			to_subt = pro_arr - params[:operator][:procedures]

			to_add.each do |p_id|
				Operation.create(procedure_id: p_id, operator_id: params[:id])
			end

			to_subt.each do |p_id|
				operation = Operation.find_by(procedure_id: p_id, operator_id: params[:id])
				operation.delete
			end

		end

		head :ok
	end

	# DELETE /operators/:id
	def destroy
		@operator = Operator.find(params[:id])
		# if not deactivated
		if !(@operator.user.deactivated)
			@operator.user.update_attributes(deactivated: true)
		end

		head :ok
	end
	
end
