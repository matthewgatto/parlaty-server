class Procedure < ApplicationRecord
	#since mysql doesn't have native array type
	serialize :steps_order, Array

	has_many	:steps, dependent: :destroy
	belongs_to :oem_business, optional: true
	has_many :operations, dependent: :destroy
	has_many :operators, through: :operations
end
