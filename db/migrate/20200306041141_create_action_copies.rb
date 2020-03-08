class CreateActionCopies < ActiveRecord::Migration[5.2]
  def change
    create_table :action_copies do |t|
      t.references :step, foreign_key: true
      t.references :action, foreign_key: true
      t.string :parameter_value_8_pack

      t.timestamps
    end
  end
end
