class DropActionInstancesTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :action_instances
  end
end
