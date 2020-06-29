class CreateOemBusinessesAndOperatorsLink < ActiveRecord::Migration[5.2]
  def change
    create_table :oem_businesses_operators, id: false do |t|
      t.bigint :oem_business_id
      t.bigint :operator_id
    end
 
    add_index :oem_businesses_operators, :oem_business_id
    add_index :oem_businesses_operators, :operator_id
  end
end

