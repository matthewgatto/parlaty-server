class Operator < ApplicationRecord
	has_one :user, as: :roleable
	has_many :operations, through: :user, dependent: :destroy
	has_many :procedures, through: :operations
	has_and_belongs_to_many :oem_businesses, join_table: "oem_businesses_operators"

  def oem
    self.oem_businesses.first.oem
  end

end
