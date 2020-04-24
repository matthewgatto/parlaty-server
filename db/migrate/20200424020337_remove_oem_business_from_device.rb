class RemoveOemBusinessFromDevice < ActiveRecord::Migration[5.2]
  def change
    remove_reference :devices, :oem_business, foreign_key: true
  end
end
