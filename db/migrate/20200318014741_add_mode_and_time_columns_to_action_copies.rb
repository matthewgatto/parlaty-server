class AddModeAndTimeColumnsToActionCopies < ActiveRecord::Migration[5.2]
  def change
    add_column :action_copies, :mode, :string
    add_column :action_copies, :time, :integer
  end
end
