class AddModeAndTimeColumnsToActions < ActiveRecord::Migration[5.2]
  def change
    add_column :actions, :mode, :string
    add_column :actions, :time, :integer
  end
end
