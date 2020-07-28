class AddProceduresLimitToOems < ActiveRecord::Migration[5.2]
  def change
    add_column :oems, :procedures_limit, :numeric
  end
end
