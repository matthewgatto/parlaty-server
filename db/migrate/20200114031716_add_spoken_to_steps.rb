class AddSpokenToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :spoken, :boolean
  end
end
