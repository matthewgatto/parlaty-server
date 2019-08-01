class OemBusinessesController < ApplicationController	
	#before_action :require_login

	# GET /oem_businesses/:id
	def show
		# padmin and it's oem
		@oemb = OemBusiness.find(params[:id])
	end

	# GET /oems/:id/oem_businesses
	def oem_oembus_index
		# padmin and it's oem
		
		# if !(current_user.roleable_type == "Oem")
		# 	render json: {"error": "Current user not an operator"}, status: :forbidden and return
		# end

		oem = Oem.find(params[:id])
		oem_bus = oem.oem_businesses

		# sort array by name
		# &:name is {|i| i.name }
		@sorted_ob = oem_bus.sort_by &:name
		# output in oems/oem_oembus_index.json.jb
	end
end
