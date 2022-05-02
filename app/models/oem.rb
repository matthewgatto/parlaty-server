class Oem < ApplicationRecord
	has_one :subscription
	has_many :oem_businesses, dependent: :destroy
	has_many :saved_steps, class_name: "Step"
	has_many :client_admins, dependent: :destroy
	has_many :operators, through: :oem_businesses
        has_many :authors, through: :oem_businesses
	
	validates :name, presence: true, uniqueness: true
       
        before_save :check_source
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
            sub = self.build_subscription(user_count: self.user_count)
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

        def check_source
          if source_id_changed? && self.source_id.present? && self.customer_id.present?
            pps = self.pps
            sources = pps.get_payment_methods(self.customer_id)
            sources.each do |source|
              if source.id != self.source_id
                pps.remove_payment_method(source.id)
              end
            end
          end
        end
end
