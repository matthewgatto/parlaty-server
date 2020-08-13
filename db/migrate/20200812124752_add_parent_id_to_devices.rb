class AddParentIdToDevices < ActiveRecord::Migration[5.2]
  def change
    add_column :devices, :parent_id, :integer
  end
end
