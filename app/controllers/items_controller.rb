class ItemsController < ApplicationController

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def add_to_cart
    @item = Item.find(params[:id])
    current_cart << @item
    redirect_to item_path(@item)
  end

  def remove_from_cart
    @item = Item.find(params[:id])
    current_cart.delete_if {|item| item["id"] == @item.id}
    redirect_to cart_path
  end
end
