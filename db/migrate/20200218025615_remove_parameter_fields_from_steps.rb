class RemoveParameterFieldsFromSteps < ActiveRecord::Migration[5.2]
  def change
    remove_column :steps, :parameter_name, :string
    remove_column :steps, :parameter_value_8_pack, :string
    remove_column :steps, :parameter_value_12_pack, :string
  end
end
