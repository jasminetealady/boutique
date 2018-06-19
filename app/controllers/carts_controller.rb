class CartsController < ApplicationController

  def show
    # raise issue
    @cart = current_cart
    @total = cart_total
    @user = current_user
  end

  def destroy
    session[:cart].clear
    redirect_to root_path
  end
end
