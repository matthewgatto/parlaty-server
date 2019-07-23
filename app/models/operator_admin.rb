class OperatorAdmin < ApplicationRecord
	has_one :user, as: :roleable
	belongs_to :oem_business
end
