class CreateProcedures < ActiveRecord::Migration[5.2]
  def change
    create_table :procedures do |t|
    	t.string	:name
    	t.float		:version
    	t.text		:description
    	t.string	:category
    	t.string	:author
    	t.string	:language
    	
      t.timestamps
    end
  end
end
