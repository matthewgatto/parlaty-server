class Oem < ApplicationRecord
	has_one :subscription
	has_many :oem_businesses, dependent: :destroy
	has_many :saved_steps, class_name: "Step"
	has_many :client_admins, dependent: :destroy

	after_save :check_customer_id




	def check_customer_id
          if !self.customer_id.present?
            customer = self.pps.create_oem_customer(self)
            if self.good_response?(customer)
              self.update(customer_id: customer.id)
            end
          end
	end
end
