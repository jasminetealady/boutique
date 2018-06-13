class ItemsController < ApplicationController

  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.find(params[:id])
    #creates CartItem and if logged in associates with user
    @cart_item = CartItem.create(item_id: @item.id, cart_id: current_user.try(:cart).try(:id))
    current_cart << @cart_item
    redirect_to item_path(@item)
  end


  def update
    #updates users cart.cart_items
    @item = CartItem.find_by(item_id: item_params[:id])
    @item.quantity = item_params[:quantity]
    @item.save
    #updates session cart items
    item = current_cart.find{|i| i["item_id"] == item_params[:id].to_i}
    item["quantity"] = item_params[:quantity]
    redirect_to cart_path
  end

  def destroy
    @item = Item.find(params[:id])
    current_cart.delete_if {|item| item["item_id"] == @item.id}
    current_user.cart.cart_items.destroy(CartItem.find_by(item_id: @item.id)) if current_user
    redirect_to cart_path
  end

  private
    def item_params
      params.permit(:quantity, :id)
    end
end
