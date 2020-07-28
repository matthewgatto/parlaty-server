class ChangeProcedureLanguage < ActiveRecord::Migration[5.2]
  def up
    remove_column :procedures, :language
    add_column :procedures, :language_id, :string , foreign_key: true
  end

  def down
    remove_column :procedures, :language_id
    add_column :procedures, :language, :string
  end

end
