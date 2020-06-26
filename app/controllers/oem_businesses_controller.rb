class OemBusinessesController < ApplicationController
	before_action :require_login

	# GET /oem_businesses/:id
	def show
		#byebug
		@oemb = OemBusiness.find(params[:id])
		curr_user = current_user
		roleable = curr_user.roleable
		hasOemBusiness = false
		if is_author? || is_operator?
			roleable.oem_businesses.map do |ob|
				if !hasOemBusiness
					hasOemBusiness = ob.id == params[:id].to_i
				end
			end
		end
		is_valid = is_p_admin? || cuser_is?("Oem", @oemb.oem_id) ||
			(is_author? && hasOemBusiness) ||
			(is_operator? && hasOemBusiness) ||
			is_client_admin?
		if !is_valid
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end

	end

	# GET /oems/:id/oem_businesses
	def oem_oembus_index
		# padmin and itself
		# and users whch belong to oem and oem businesses (categories)
		can_access = is_p_admin? || cuser_is?("Oem", params[:id]) || is_author? || is_operator?
		if !can_access
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

	# POST /oem_businesses
	def create
		#byebug
		if !is_p_admin? && !is_client_admin?
			render json: {"error": "Current user access denied"}, status: :forbidden and return
		end
		name = params[:name]
		oem_id = params[:oem_id]
		if (is_client_admin?)
			@client_admin = current_user.roleable
			oem_id = @client_admin.oem_id
		end
		@oem = Oem.find(oem_id)
		@oemb = OemBusiness.create!(name: name)
		@oem.oem_businesses << @oemb
		render json: {"oem_business": { "id": @oemb.id, "name": @oem.name, "oem_id": @oem.id}}, status: :ok
	end
	
	# DELETE /oem_businesses/:id
	def destroy
		#byebug
		@oemb = OemBusiness.find(params[:id])
		if (@oemb)
			if delete_oem_business(@oemb)
				render json: { "id": params[:id]}, status: :ok
			else
				head :bad_request
			end
		end
	end
	
	private

end
