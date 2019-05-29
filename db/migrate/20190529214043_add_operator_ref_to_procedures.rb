class AddOperatorRefToProcedures < ActiveRecord::Migration[5.2]
  def change
  	add_reference :procedures, :operator, foreign_key: true, index: true
  end
end
