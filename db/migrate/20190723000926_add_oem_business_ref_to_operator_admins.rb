class AddOemBusinessRefToOperatorAdmins < ActiveRecord::Migration[5.2]
  def change
  	add_reference :operator_admins, :oem_business, foreign_key: true
  end
end
