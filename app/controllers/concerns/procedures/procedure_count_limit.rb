# frozen_string_literal: true

module Procedures
	# ProcedureCountLimit
	module ProcedureCountLimit
		extend ActiveSupport::Concern

		included do
		end

		private

		def count_limited?(oem)
			limit = oem.procedures_limit
			return false if limit.blank?

			limit.to_i <= (procedures_count(oem) || 0).to_i
		end

		def procedures_count(oem)
			OemBusiness.procedures_count(oem.id).map{|a| a.count}.sum
		end

	end
end