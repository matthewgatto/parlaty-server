class RemoveOemBusinessFromProcedure < ActiveRecord::Migration[5.2]
  def change
    remove_reference :procedures, :oem_business, foreign_key: true
  end
end
