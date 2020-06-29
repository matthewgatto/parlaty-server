class RemoveOemBusinessFromAuthor < ActiveRecord::Migration[5.2]
  def change
    remove_reference :authors, :oem_business, foreign_key: true
  end
end
