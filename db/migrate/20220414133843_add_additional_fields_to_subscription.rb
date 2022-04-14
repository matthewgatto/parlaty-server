class AddAdditionalFieldsToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :start_date, :datetime
    add_column :subscriptions, :end_date, :datetime
  end
end
