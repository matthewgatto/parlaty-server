class OperatorAdminsController < ApplicationController
	before_action :require_login

	# GET /oem_businesses/:id/operator_admins
	def oembus_oadmin_index
		# own oem have access, padmin

		oemb = OemBusiness.find(params[:id])

		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		@oadmins = oemb.operator_admins.where(deactivated: false)
	end

	# PUT /operator_admins/:id
	def update
		# own oem have access, padmin

		oadmin = OperatorAdmin.find(params[:id])
		oemb = OemBusiness.find(oadmin.oem_business_id)

		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		# if params exist, yet cannot update
		if params[:operator_admin][:email] && 
			!(oadmin.user.update_attributes(email: params[:operator_admin][:email])) 
				render json: { "error": "can't update email" }, status: :bad_request and return
		end

		if params[:operator_admin][:name] &&
			!(oadmin.update_attributes(name: params[:operator_admin][:name]))
				render json: { "error": "can't update name, but updated email if requested for email change" }, 
				status: :bad_request and return
		end

		head :ok

	end

	# DELETE /operator_admins/:id
	def destroy
		# own oem have access, padmin

		oadmin = OperatorAdmin.find(params[:id])
		oemb = OemBusiness.find(oadmin.oem_business_id)

		if !( is_p_admin? || cuser_is?("Oem", oemb.oem_id) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		# if not deactivated
		if !(oadmin.deactivated)
			oadmin.update_attributes(deactivated: true)
		end

		head :ok
	end
	
end
