class RemoveParameterNameFromActions < ActiveRecord::Migration[5.2]
  def up
    remove_column :actions, :parameter_name
  end

  def down
    add_column :actions, :parameter_name, :string
  end
end
