class AddAssociatedProcedureIdForSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :associated_procedure_id, :integer , foreign_key: true
    add_column :steps, :enabled_associated_procedure, :boolean, default: false
  end
end
