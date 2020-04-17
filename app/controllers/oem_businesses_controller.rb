class OemBusinessesController < ApplicationController
	before_action :require_login

	# GET /oem_businesses/:id
	def show
		@oemb = OemBusiness.find(params[:id])
		curr_user = current_user
		is_author = curr_user.roleable_type == "Author" 
		is_operator = curr_user.roleable_type == "Operator" 
		roleable = curr_user.roleable
		hasOemBusiness = false
		if is_author || is_operator
			roleable.oem_businesses.map do |ob|
				if !hasOemBusiness
					hasOemBusiness = ob.id == params[:id].to_i
				end
			end
		end
		is_valid = is_p_admin? || cuser_is?("Oem", @oemb.oem_id) ||
			(is_author && hasOemBusiness) ||
			(is_operator && hasOemBusiness)
		puts "**** is_valid: " + is_valid.to_s
		if !is_valid
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
		@oem_name = oem.name
		@sorted_ob = oem_bus.sort_by &:name
		# output in oems/oem_oembus_index.json.jb
	end

	private

end
