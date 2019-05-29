class Procedure < ApplicationRecord
	has_many	:steps, dependent: :destroy
end
