# frozen_string_literal: true

module Procedures
	# ProcedureLib
	module ProcedureLib
		extend ActiveSupport::Concern

		included do
		end

		private

		def limited?
			oem_business = procedure_oem_business(procedure_params[:oem_business_ids])
			return true if oem_business.blank?

			@oem = oem_business.oem
			count_limited?(@oem)
		end

		def count_limited?(oem)
			limit = oem.procedures_limit
			return false if limit.blank?

			limit.to_i <= (procedures_count(oem) || 0).to_i
		end

		def procedures_count(oem)
			OemBusiness.procedures_count(oem.id).map{|a| a.count}.sum
		end

		def procedures_names(oem)
			OemBusiness.procedures_names(oem.id).map{|a| {id: a.id, name: a.name} }
		end

		def procedure_oem_business(ids = nil)
			oem_business_ids = ids || @procedure.oem_business_ids
			OemBusiness.where(id: oem_business_ids).first if oem_business_ids.present?
		end
	end
end