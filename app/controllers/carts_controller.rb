class CartsController < ApplicationController

  def show
    @cart = current_cart
    @total = cart_total
  end
end
