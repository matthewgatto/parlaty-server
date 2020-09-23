class AddMachineTagToDevices < ActiveRecord::Migration[5.2]
  def change
    add_column :devices, :machine_tag, :string
  end
end
