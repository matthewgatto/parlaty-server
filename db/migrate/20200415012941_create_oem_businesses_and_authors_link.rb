class CreateOemBusinessesAndAuthorsLink < ActiveRecord::Migration[5.2]
  def change
    create_table :oem_businesses_authors, id: false do |t|
      t.bigint :oem_business_id
      t.bigint :author_id
    end
 
    add_index :oem_businesses_authors, :oem_business_id
    add_index :oem_businesses_authors, :author_id
  end
end

