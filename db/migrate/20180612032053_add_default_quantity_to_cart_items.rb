class AddDefaultQuantityToCartItems < ActiveRecord::Migration[5.2]
  def change
    change_column_default :cart_items, :quantity, 1
  end
end
