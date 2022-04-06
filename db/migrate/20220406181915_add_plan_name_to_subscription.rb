class AddPlanNameToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :plan_name, :string
  end
end
