class ChangeLocationToBeTextInSteps < ActiveRecord::Migration[5.2]
  def change
    change_column :steps, :location, :text
  end
end
