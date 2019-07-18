class AddOemRefToOemBusinesses < ActiveRecord::Migration[5.2]
  def change
    add_reference :oem_businesses, :oem, foreign_key: true
  end
end
