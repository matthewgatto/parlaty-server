class RemoveOemBusinessFromOperator < ActiveRecord::Migration[5.2]
  def change
    remove_reference :operators, :oem_business, foreign_key: true
  end
end
