class AddLoopValueToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :loop_value, :integer, default: 1
  end
end
