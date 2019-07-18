class OemBusiness < ApplicationRecord
	belongs_to :oem, optional: true
	has_many :procedures
end
