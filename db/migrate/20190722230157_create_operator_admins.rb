class CreateOperatorAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :operator_admins do |t|
    	t.string :name
    	t.boolean :deactivated, default: false

      t.timestamps
    end
  end
end
