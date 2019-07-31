class CreateProcedures < ActiveRecord::Migration[5.2]
  def change
    create_table :procedures do |t|
    	t.string	:name
    	t.float		:version
    	t.text		:description
    	t.string	:category
    	t.string	:author
    	t.string	:language
      # mysql doesn't have native array type. serialize it in /models/procedures.rb
      # storing it in array to minimize query calls when updating the order 
      t.text :steps_order 
      t.references :oem_business, foreign_key: true 

    	
      t.timestamps
    end
  end
end
