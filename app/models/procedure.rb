class Procedure < ApplicationRecord
	has_many	:steps, dependent: :destroy
	belongs_to :operator, optional: true
end
