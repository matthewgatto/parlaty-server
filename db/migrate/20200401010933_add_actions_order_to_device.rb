class AddActionsOrderToDevice < ActiveRecord::Migration[5.2]
  def change
    add_column :devices, :actions_order, :text
  end
end
