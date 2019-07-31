class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
    	t.string	:title
    	t.string	:device
    	t.string	:location
      t.string  :mode
    	t.text		:note
      t.integer :time
      t.string  :parameter
      t.boolean   :safety, default: false
      t.boolean   :has_visual, default: false
      t.references :procedure, foreign_key: true
      t.references  :oem, foreign_key: true 
    	
      t.timestamps
    end
  end
end
