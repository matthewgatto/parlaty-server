class AddParentIdToActions < ActiveRecord::Migration[5.2]
  def change
    add_column :actions, :parent_id, :integer
  end
end
