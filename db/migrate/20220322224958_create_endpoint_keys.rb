class CreateEndpointKeys < ActiveRecord::Migration[5.2]
  def change
    create_table :endpoint_keys do |t|
      t.string :endpoint_controller
      t.string :endpoint_action
      t.string :endpoint_secret

      t.timestamps
    end
  end
end
