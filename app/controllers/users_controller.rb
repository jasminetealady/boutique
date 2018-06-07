class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if params[:first_name].present? && params[:last_name].present? && params[:email].present? && params[:password].present?
    @user = User.create(user_params)
    redirect_to login_path
    else
      flash[:message] = "Yo you need to fill those fields homie"
      redirect_to signup_path
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
