class Procedure < ApplicationRecord
	#since mysql doesn't have native array type
	serialize :steps_order, Array

	has_many	:steps, dependent: :destroy
	#belongs_to :oem_business, optional: true
	has_many :operations, dependent: :destroy
	has_many :operators, through: :operations
	has_many :devices, dependent: :destroy
	has_and_belongs_to_many :oem_businesses, join_table: "oem_businesses_procedures"
end
