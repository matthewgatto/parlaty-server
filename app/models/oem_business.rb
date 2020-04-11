class OemBusiness < ApplicationRecord
	belongs_to :oem, optional: true
	has_many :procedures
	has_many :operator_admins
	has_many :operators
	has_many :devices
	has_many :authors
end
