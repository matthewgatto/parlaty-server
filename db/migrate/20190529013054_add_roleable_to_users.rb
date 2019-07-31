class AddRoleableToUsers < ActiveRecord::Migration[5.2]
  def change
  	#index default true
    add_reference :users, :roleable, polymorphic: true
  end
end
