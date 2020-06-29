class AddOemBusinessBelongsToToDevices < ActiveRecord::Migration[5.2]
  def change
    add_reference :devices, :oem_business, foreign_key: true
  end
end
