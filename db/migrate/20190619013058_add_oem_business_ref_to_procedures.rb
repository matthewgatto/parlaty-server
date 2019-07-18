class AddOemBusinessRefToProcedures < ActiveRecord::Migration[5.2]
  def change
    add_reference :procedures, :oem_business, foreign_key: true
  end
end
