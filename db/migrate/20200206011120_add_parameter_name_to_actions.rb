class AddParameterNameToActions < ActiveRecord::Migration[5.2]
  def change
    add_column :actions, :parameter_name, :string
    add_column :actions, :parameter_value_8_pack, :string
    add_column :actions, :parameter_value_12_pack, :string
  end
end
