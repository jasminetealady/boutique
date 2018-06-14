class AddOrderIdToAddresses < ActiveRecord::Migration[5.2]
  def change
    add_column :addresses, :order_id, :integer
  end
end
