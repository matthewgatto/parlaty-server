class AddProcedureRefToSteps < ActiveRecord::Migration[5.2]
  def change
  	# foreign key has to be a existing procedure
    add_reference :steps, :procedure, foreign_key: true, index: true
  end
end
