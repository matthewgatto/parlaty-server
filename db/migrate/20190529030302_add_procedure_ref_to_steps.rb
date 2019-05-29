class AddProcedureRefToSteps < ActiveRecord::Migration[5.2]
  def change
  	# foreign key has to be a existing procedure, can be nil
    add_reference :steps, :procedure, foreign_key: true, index: true
  end
end
