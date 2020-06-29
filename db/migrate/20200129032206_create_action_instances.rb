class CreateActionInstances < ActiveRecord::Migration[5.2]
  def change
    create_table :action_instances do |t|
      t.string :parameter_name
      t.string :parameter_value_8_pack
      t.string :parameter_value_12_pack
      t.references :step, foreign_key: true
      t.references :action, foreign_key: true

      t.timestamps
    end
  end
end
