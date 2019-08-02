class OemBusinessesController < ApplicationController	
	before_action :require_login

	# GET /oem_businesses/:id
	def show
		# padmin and it's oem have access
		@oemb = OemBusiness.find(params[:id])

		if !( verify_type?("Oem") && cuser_is?("Oem", @oemb.oem_id) )
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		
	end

	# GET /oems/:id/oem_businesses
	def oem_oembus_index
		# padmin and itself
		if !( verify_type?("Oem") && cuser_is?("Oem", params[:id]) ) 
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

		# return true if current_user is padmin
		def cuser_is?(type, id)
			if(current_user.roleable_type == type)
				return (current_user.roleable_id == id)
			end

			return true
		end

end
