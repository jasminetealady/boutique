class ItemsController < ApplicationController

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def add_to_cart
    @item = Item.find(params[:id])
    @cart_item = CartItem.create(item_id: @item.id)
    if current_user
      @cart_item.cart_id = current_user.cart.id
    end
    current_cart << @cart_item
    redirect_to item_path(@item)
  end

  def remove_from_cart
    @item = Item.find(params[:id])
    current_cart.delete_if {|item| item["item_id"] == @item.id}
    redirect_to cart_path
  end
end
