class OemBusiness < ApplicationRecord
	belongs_to :oem, optional: true
	has_and_belongs_to_many :operators, join_table: "oem_businesses_operators"
	has_and_belongs_to_many :authors, join_table: "oem_businesses_authors"
	has_and_belongs_to_many :procedures, join_table: "oem_businesses_procedures"

	before_destroy :procedures_destroy

	scope :by_user, -> (user) {
		joins("#{user.roleable_type.downcase}s".to_sym)
				.where("#{user.roleable_type.downcase}s.id = ?", user.roleable.id)
	}

	scope :procedures_count, -> (oem_id) {
		joins(:procedures)
				.select("COUNT(DISTINCT procedure_id) AS count")
				.where(oem_id: oem_id)
	}

	private

	def procedures_destroy
		procedures.each do |procedure|
			procedure.oem_businesses.count == 1 ? procedure.destroy : false
		end
	end
end
