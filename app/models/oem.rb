class Oem < ApplicationRecord
	has_one :subscription
	has_many :oem_businesses, dependent: :destroy
	has_many :saved_steps, class_name: "Step"
	has_many :client_admins, dependent: :destroy
	has_many :operators, through: :oem_businesses
        has_many :authors, through: :oem_businesses
       

	after_save :check_subscription, :check_customer_id

	def user_count
          admin_count = self.client_admins.distinct.count
          operator_count = self.operators.distinct.count
          author_count = self.authors.distinct.count
          admin_count + operator_count + author_count
        end

	protected

	def check_subscription
          if !self.subscription.present?
            sub = self.build_subscription
            sub.save
          end
        end

	def check_customer_id
          if !self.customer_id.present?
            customer = self.pps.create_oem_customer(self)
            if self.good_response?(customer)
              self.update(customer_id: customer.id)
            end
          end
	end
end
