class AddPaidUpToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :paid_up, :boolean, default: false
  end
end
