class AddDefaultMediaToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :default_media, :integer, default: -1
  end
end
