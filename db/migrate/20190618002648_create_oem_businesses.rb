class CreateOemBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :oem_businesses do |t|
    	t.string	:name
    	t.references :oem, foreign_key: true
    	
      t.timestamps
    end
  end
end
