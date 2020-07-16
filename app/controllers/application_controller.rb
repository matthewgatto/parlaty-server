class ApplicationController < ActionController::API
	respond_to :json
	include RequireLogin

	def current_user
		if @user_id
			@current_user ||= User.find(@user_id)
		else
			head :unauthorized
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

	def delete_oem(oem)
		#byebug
		delete_saved_steps(oem.saved_steps)
		delete_client_admins(oem.client_admins)
		delete_oem_businesses(oem.oem_businesses)
		oem.destroy
	end

	def delete_oem_business(oemb)
		delete_procedures(oemb.procedures)
		oemb.destroy
	end

	def delete_saved_steps(elements)
		unless elements.nil?
			elements.map do |element|
				element.destroy
			end
		end
	end

	def delete_client_admins(elements)
		unless elements.nil?
			elements.map do |element|
				element.destroy
			end
		end
	end

	def delete_oem_businesses(elements)
		unless elements.nil?
			elements.map do |element|
				delete_oem_business(element)
			end
		end
	end

	def delete_procedures(elements)
		unless elements.nil?
			elements.map do |element|
				delete_procedure(element)
			end
		end
	end

	def delete_procedure(procedure)
		# don't delete procedure if it belongs to other oem_business
		procedure.oem_businesses.count == 1 && procedure.destroy
	end

end


