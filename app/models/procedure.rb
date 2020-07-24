class Procedure < ApplicationRecord
	serialize :steps_order, Array

	has_many	:steps, dependent: :destroy
	has_many :operations, dependent: :destroy
	has_many :operators, through: :operations
	has_many :devices, dependent: :destroy
	belongs_to :language, optional: true
	has_and_belongs_to_many :oem_businesses, join_table: "oem_businesses_procedures"
end
