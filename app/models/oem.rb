class Oem < ApplicationRecord
	has_many :oem_businesses, dependent: :destroy
	has_many :saved_steps, class_name: "Step"
	has_many :client_admins, dependent: :destroy
end
