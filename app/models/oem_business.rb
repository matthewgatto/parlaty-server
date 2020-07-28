class OemBusiness < ApplicationRecord
	belongs_to :oem, optional: true
	has_and_belongs_to_many :operators, join_table: "oem_businesses_operators"
	has_and_belongs_to_many :authors, join_table: "oem_businesses_authors"
	has_and_belongs_to_many :procedures, join_table: "oem_businesses_procedures"

	scope :by_user, -> (user) {
		joins("#{user.roleable_type.downcase}s".to_sym)
				.where("#{user.roleable_type.downcase}s.id = ?", user.roleable.id)
	}

end
