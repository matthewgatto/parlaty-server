class AddOrderToSteps < ActiveRecord::Migration[5.2]
  def change
    add_column :steps, :order, :integer
  end
end
