class Operator < ApplicationRecord
	has_one :user, as: :roleable
	has_many :operations, dependent: :destroy
	has_many :procedures, through: :operations
end
