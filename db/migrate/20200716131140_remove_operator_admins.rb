class RemoveOperatorAdmins < ActiveRecord::Migration[5.2]
  def change
    drop_table :operator_admins
  end
end
