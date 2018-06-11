class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if signup_fields_present
    @user = User.create(user_params)
    @user.cart = Cart.create(user_id: @user.id)
    redirect_to login_path
    else
    flash[:message] = "Yo you need to fill those fields homie"
    redirect_to signup_path
    end
  end


end
