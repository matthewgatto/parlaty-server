class OperatorAdminsController < ApplicationController

	# GET /oem_businesses/:id/operator_admins
	def oembus_oadmin_index
		oemb = OemBusiness.find(params[:id])

		@oadmins = oemb.operator_admins.where(deactivated: false)
	end

	# PUT /operator_admins/:id
	def update

	end
	
end
