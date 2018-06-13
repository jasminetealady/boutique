class OrdersController < ApplicationController
end



# clicks Checkout
# checkout goes to new
# orders#new provides a form for name and address
# provides the option to save address or select from your own
# submit order to orders#create
# it creates an order
# @order = Order.create(order_params)
# @address = Address.create(address_params)
# if @order.save_address.true?
#   current_user.addresses << @address
# end
# @order_items = @order.cart_items
# current_cart.each{|i| @order_items << i}
# end

# in the view, show order you just made
# in account view, show past orders
# current_user.orders.each do |order|
# order.cart_items.each do
# order.total
# order date purchased

#make sure to add total:decimal to orders
