class AddDeviceToSteps < ActiveRecord::Migration[5.2]
  def change
    add_reference :steps, :device, foreign_key: true
  end
end
