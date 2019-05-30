class CreateParlatyAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :parlaty_admins do |t|
    	t.string	:email
    	t.string	:password_digest

      t.timestamps
    end
  end
end
