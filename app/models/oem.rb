class Oem < ApplicationRecord
	has_one :user, as: :roleable
	has_many :oem_businesses
	has_many :saved_steps, class_name: "Step"
	has_many :client_admins
end
