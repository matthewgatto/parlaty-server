class Oem < ApplicationRecord
	has_one :user, as: :roleable
	has_many :oem_businesses
end
