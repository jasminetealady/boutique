class OrdersController < ApplicationController

  def new
    @address = Address.new(user_id: params[:user_id])
    @total = cart_total
    @order = Order.new(user_id: params[:user_id])
    @cart_items = user_items
  end

  def create
    if params["saved_address"].present?
      @address = Address.find(params["saved_address"])
    else
      @address = current_user.addresses.build(address_params)
    end
    @order = current_user.orders.build(order_params)
    @order.address = @address
    @order.total = cart_total
    @order.cart_items = user_items
    @order.save
    if @order.save_address
      current_user.addresses << @address
    end
    session.delete :cart
    #dissociates cart_items from cart and therefore user, but accessible via orders
    user_items.delete_all
    redirect_to root_path
  end

  def show

  end


  private
    def order_params
      params.require(:order).permit(:save_address, :id)
    end

    def address_params
      params.require(:address).permit(:first_name, :last_name, :company, :address, :city, :state, :apt_or_suite, :zip_code, :phone_number)
    end
end
