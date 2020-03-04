class AddDefaultColumnToActions < ActiveRecord::Migration[5.2]
  def change
    add_column :actions, :default, :boolean
  end
end
