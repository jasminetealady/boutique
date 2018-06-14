class OrdersController < ApplicationController

  def new
    @address = Address.new(user_id: params[:user_id])
    @total = cart_total
    @order = Order.new(user_id: params[:user_id])
    @cart_items = current_user.cart.cart_items
  end

end
