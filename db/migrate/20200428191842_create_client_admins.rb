class CreateClientAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :client_admins do |t|
      t.string :name
      t.references :oem, foreign_key: true      
      t.timestamps
    end
  end
end
