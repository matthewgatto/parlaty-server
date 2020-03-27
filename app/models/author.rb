class Author < ApplicationRecord
    has_one :user, as: :roleable
	has_many :operations, dependent: :destroy
	has_many :procedures, through: :operations
    belongs_to :oem_business
end
