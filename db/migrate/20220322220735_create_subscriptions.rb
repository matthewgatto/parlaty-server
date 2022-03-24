class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :oem_id
      t.integer :subscription_status, default: 0
      t.integer :payment_status, default: 0
      t.integer :confirm_status, default: 0
      t.string :subscription_plan_id
      t.string :subscription_id
      t.string :failed_invoice
      t.string :coupon_code
      t.integer :user_count, default: 1

      t.timestamps
    end
  end
end
