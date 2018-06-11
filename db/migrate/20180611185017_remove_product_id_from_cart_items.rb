class RemoveProductIdFromCartItems < ActiveRecord::Migration[5.2]
  def change
    remove_column :cart_items, :product_id, :integer
  end
end
