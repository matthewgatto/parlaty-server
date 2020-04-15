class OemBusiness < ApplicationRecord
	belongs_to :oem, optional: true
	has_many :procedures
	has_many :operator_admins
	has_and_belongs_to_many :operators, join_table: "oem_businesses_operators"
	has_many :devices
	has_and_belongs_to_many :authors, join_table: "oem_businesses_authors"
end
