class AddAccountActiveToOem < ActiveRecord::Migration[5.2]
  def change
    add_column :oems, :account_active, :boolean, default: false
  end
end
