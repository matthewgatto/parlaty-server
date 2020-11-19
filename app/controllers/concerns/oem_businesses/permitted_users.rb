# frozen_string_literal: true

module OemBusinesses
	# PermittedUsers
	module PermittedUsers
		extend ActiveSupport::Concern

		included do
		end

		private

		def authors_list(oem_business)
			(oem_business.authors + oem_business.oem.client_admins).map{ |role| role.user }
		end


		def permitted_user?(user, oem_business)
			user.parlaty_admin? ||
				user.client_admin? && oem_business.oem_id == user.roleable.oem_id ||
				oem_business.author_ids.include?(user.roleable.id) ||
				oem_business.operator_ids.include?(user.roleable.id)
		end

	end
end