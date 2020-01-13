class AddParameterValuesToStepsAndRenameParameter < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :parameter_value_8_pack, :string
    add_column :steps, :parameter_value_12_pack, :string
    rename_column :steps, :parameter, :parameter_name
  end
end
