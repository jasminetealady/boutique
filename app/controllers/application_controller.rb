class ApplicationController < ActionController::Base
  helper_method :current_user, :current_cart, :logged_in?, :cart_total, :user_items, :clear_cart

private

  def logged_in?
    current_user.present?
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end

  def signup_fields_present
    user_params[:first_name].present? && user_params[:last_name].present? && user_params[:email].present? && user_params[:password].present?
  end

  def current_cart
    session[:cart] ||= []
  end

  def current_user(user=nil)
    if session[:user_id]
      return User.find(session[:user_id])
    elsif user
      session[:user_id] = user.id
    else
      nil
    end
  end

  def associate_cart_items_to_user
    if current_cart
      current_cart.each do |item|
        #adds users cart id to session items
        item["cart_id"] = current_user.cart.try(:id)
        #creates a cart item associated with user
        user_items.create(item_id: item["item_id"] )
      end
    end
  end

  def cart_total
    cart_prices = []
    current_cart.each{|i| cart_prices << Item.find(i["item_id"]).price * i["quantity"].to_i}
    cart_prices.sum
  end

  def user_items
    current_user.cart.cart_items
  end

  def clear_cart
    session[:cart].clear
    user_items.delete_all
  end

  def require_login
    redirect_to login_path unless logged_in?
  end


end
