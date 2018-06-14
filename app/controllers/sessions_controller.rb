class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if auth
      user = User.find_or_create_by_omniauth(auth)
      current_user(user)
      redirect_to root_path
    else
      user = User.find_by(email: user_params[:email])
      if user && user.authenticate(user_params[:password])
      current_user(user)
      associate_cart_items_to_user
      if !current_cart.empty?
        redirect_to cart_path
      else
      redirect_to root_path
      end
    else
      flash[:message] = "Incorrect login"
      redirect_to login_path
    end
    end
  end

  def destroy
    if current_user
      session.delete :user_id
    end
    redirect_to '/'
  end

  private

  def auth
    request.env["omniauth.auth"]
  end


end
