class CreateOemBusinessesAndProceduresLink < ActiveRecord::Migration[5.2]
  def change
    create_table :oem_businesses_procedures, id: false do |t|
      t.bigint :oem_business_id
      t.bigint :procedure_id
    end
  
    add_index :oem_businesses_procedures, :oem_business_id
    add_index :oem_businesses_procedures, :procedure_id
  
  end
end

