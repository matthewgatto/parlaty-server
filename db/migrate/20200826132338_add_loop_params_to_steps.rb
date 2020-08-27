class AddLoopParamsToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :enabled_loop, :boolean, default: false
    add_column :steps, :steps_in_loop, :integer, default: 1
  end
end
