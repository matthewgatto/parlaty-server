class AddProcedureBelongsToToDevices < ActiveRecord::Migration[5.2]
  def change
    add_reference :devices, :procedure, foreign_key: true
  end
end
