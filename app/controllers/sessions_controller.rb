class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if auth
    user = User.find_or_create_by_omniauth(auth)
    session[:user_id] = user.id
    redirect_to root_path
    else
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
    current_user(user.id)
    redirect_to root_path
    else
    redirect_to root_path
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


# User class method
#
# def self.find_or_create_by_omniauth(auth_hash)
#
#   self.where(email: auth["info"]["email"]).first_or_create do |user|
      # user.id = auth["info"]["uid"]
#     user.password = SecureRandom.hex
#   end

#raise auth.inspect
