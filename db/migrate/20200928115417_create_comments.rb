class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id
      t.text    :text
      t.boolean :readed
      t.references :step, foreign_key: true

      t.timestamps
    end
  end
end
