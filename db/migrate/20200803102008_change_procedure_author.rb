class ChangeProcedureAuthor < ActiveRecord::Migration[5.2]
  def up
    remove_column :procedures, :author
    add_column :procedures, :author_id, :string , foreign_key: true
  end

  def down
    remove_column :procedures, :author_id
    add_column :procedures, :author, :string
  end
end
