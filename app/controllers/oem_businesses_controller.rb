class OemBusinessesController < ApplicationController	
	before_action :require_login

	# GET /oems/oembusinesses
	def show
		if !(current_user.roleable_type == "Oem")
			render json: {"error": "Current user not an operator"}, status: :forbidden and return
		end

		oem = Oem.find(current_user.roleable.id)
		oem_bus = oem.oem_businesses

		# sort array by name
		# &:name is {|i| i.name }
		@sorted_ob = oem_bus.sort_by &:name
		# output in oems/show.json.jb
	end
end
