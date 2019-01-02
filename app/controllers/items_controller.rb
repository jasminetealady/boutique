class ItemsController < ApplicationController

  def index
    @items = Item.all.order(:id)
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @items}
    end
  end

  def show
    @item = Item.find(params[:id])
    @review = Review.new
    
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @item}
    end
  end

  def create
    @item = Item.find(params[:id])
    #creates CartItem and if logged in associates with user or cart_id is nil
    @cart_item = CartItem.create(item_id: @item.id, cart_id: current_user.try(:cart).try(:id))
    current_cart << @cart_item
    redirect_to item_path(@item)
  end


  def update
    #updates users cart.cart_items
    if logged_in?
    @item = user_items.find_by(item_id: item_params[:id])
    @item.quantity = item_params[:quantity]
    @item.save
    end
    #updates session cart items
    item = current_cart.find{|i| i["item_id"] == item_params[:id].to_i}
    item["quantity"] = item_params[:quantity]
    redirect_to cart_path
  end

  def destroy
    @item = Item.find(item_params[:id])
    #removes from session
    current_cart.delete_if {|item| item["item_id"] == @item.id}
    #removes from users items
    if logged_in?
    user_items.destroy(user_items.find_by(item_id: @item.id))
    end
    redirect_to cart_path
  end

  private
    def item_params
      params.permit(:quantity, :id)
    end
end
