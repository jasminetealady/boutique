class ApplicationController < ActionController::Base


private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end

  def signup_fields_present
    user_params[:first_name].present? && user_params[:last_name].present? && user_params[:email].present? && user_params[:password].present?
  end

  def current_user(user_id=nil)
      user_id ? session[:user_id] = user_id : User.find(session[:user_id])
    end
end
