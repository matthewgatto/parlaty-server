class CreateOperators < ActiveRecord::Migration[5.2]
  def change
    create_table :operators do |t|
    	t.string :name
    	t.boolean :deactivated, default: false
    	t.references :oem_business, foreign_key: true

      t.timestamps
    end
  end
end
