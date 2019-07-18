class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
    	t.string	:title
    	t.string	:device
    	t.string	:location
    	t.text		:note
      t.boolean   :safety, default: false
      t.boolean   :has_visual, default: false
    	
      t.timestamps
    end
  end
end
