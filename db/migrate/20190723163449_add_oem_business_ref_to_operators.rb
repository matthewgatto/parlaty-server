class AddOemBusinessRefToOperators < ActiveRecord::Migration[5.2]
  def change
  	add_reference :operators, :oem_business, foreign_key: true
  end
end
