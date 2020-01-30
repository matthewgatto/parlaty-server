class RemoveDeviceFromSteps < ActiveRecord::Migration[5.2]
  def change
    remove_column :steps, :device, :string
  end
end
