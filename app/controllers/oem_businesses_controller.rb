class OemBusinessesController < ApplicationController	
	before_action :require_login

	# GET /oem_businesses/:id
	def show
		# padmin and its oem have access
		@oemb = OemBusiness.find(params[:id])

		if !( is_p_admin? || cuser_is?("Oem", @oemb.oem_id) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		
	end

	# GET /oems/:id/oem_businesses
	def oem_oembus_index
		# padmin and itself
		if !( is_p_admin? || cuser_is?("Oem", params[:id]) ) 
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

		oem = Oem.find(params[:id])
		oem_bus = oem.oem_businesses

		# sort array by name
		# &:name is {|i| i.name }
		@sorted_ob = oem_bus.sort_by &:name
		# output in oems/oem_oembus_index.json.jb
	end

	private

end
