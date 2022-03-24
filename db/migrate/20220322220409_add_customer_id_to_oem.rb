class AddCustomerIdToOem < ActiveRecord::Migration[5.2]
  def change
    add_column :oems, :customer_id, :string
    add_column :oems, :source_id, :string
  end
end
