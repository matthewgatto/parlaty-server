class CreateParlatyAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :parlaty_admins do |t|

      t.timestamps
    end
  end
end
