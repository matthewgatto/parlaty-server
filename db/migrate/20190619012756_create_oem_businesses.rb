class CreateOemBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :oem_businesses do |t|
    	t.string	:name
    	
      t.timestamps
    end
  end
end
