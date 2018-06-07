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
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect_to root_path
    else
    redirect_to login_path
    end
    end
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
