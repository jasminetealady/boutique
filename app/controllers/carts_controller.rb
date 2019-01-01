class CartsController < ApplicationController

  def show
    @cart = current_cart
    @total = cart_total
    @user = current_user
  end

  def destroy
    clear_cart
    redirect_to root_path
  end
end
