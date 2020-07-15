class ApplicationController < ActionController::API
	respond_to :json
	include RequireLogin

	def current_user
		if @user_id
			@current_user ||= User.find(@user_id)
		else
			head :unauthorized and return
		end
	end

	def is_p_admin?
		return current_user.roleable_type == "ParlatyAdmin"
	end

	def is_client_admin?
		return current_user.roleable_type == "ClientAdmin"
	end

	def is_author?
		return current_user.roleable_type == "Author"
	end

	def is_operator?
		return current_user.roleable_type == "Operator"
	end

	# check if the current_user is of that roleable id
	# return false if current_user is not of type "type"
	def cuser_is?(type, id)
		if !id.nil? && !id.kind_of?(Array)
			id = id.to_i
			if(current_user.roleable_type == type)
				return (current_user.roleable_id == id)
			end
		end
		return false
	end

	def cuser_is_in?(type, arr_ids)
		if(current_user.roleable_type == type)
			if !arr_ids.kind_of?(Array) || arr_ids.empty? || arr_ids.nil?
				return false
			else
				return (arr_ids.include? current_user.roleable_id)
			end
		end

		return false
	end

	def delete_oem(oem)
		#byebug
		delete_saved_steps(oem.saved_steps)
		delete_client_admins(oem.client_admins)
		delete_oem_businesses(oem.oem_businesses)
		if (oem.destroy)
			return true
		else
			return false
		end
	end

	def delete_oem_business(oemb)
		#byebug
		delete_procedures(oemb.procedures)
		if (oemb.destroy)
			return true
		else
			return false
		end
	end

	def delete_saved_steps(elements)
		if !elements.nil?
			elements.map do |element|
				element.destroy
			end
		end
	end

	def delete_client_admins(elements)
		if !elements.nil?
			elements.map do |element|
				element.destroy
			end
		end
	end

	def delete_oem_businesses(elements)
		if !elements.nil?
			elements.map do |element|
				delete_oem_business(element)
			end
		end
	end

	def delete_procedures(elements)
		if !elements.nil?
			elements.map do |element|
				delete_procedure(element)
			end
		end
	end

	def delete_procedure(procedure)
		#byebug
		# don't delete procedure if it belongs to other oem_business
		if (procedure.oem_businesses.count == 1 && procedure.destroy)
			return true
		 else
			 return false
		end
	end

end


