class CreateOperators < ActiveRecord::Migration[5.2]
  def change
    create_table :operators do |t|
    	t.string	:email
    	t.string	:password_digest
    	
      t.timestamps
    end
  end
end
