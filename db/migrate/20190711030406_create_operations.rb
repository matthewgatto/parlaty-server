class CreateOperations < ActiveRecord::Migration[5.2]
  def change
    create_table :operations do |t|
    	t.references	:operator
    	t.references	:procedure
    	t.datetime	:last_used
      t.timestamps
    end
  end
end
