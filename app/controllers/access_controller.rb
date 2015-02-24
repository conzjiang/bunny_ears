class AccessController < ApplicationController
  before_action :require_admin, only: [:destroy]
  before_action :redirect_to_sign_in, only: :show

  def new
  end

  def create
    if User.valid_password?(access_params[:password])
      grant_access!
      redirect_to admin_url
    else
      render json: "Access Denied", status: 403
    end
  end

  def show
    category = "on_the_air"
    @mark = { category: category, counter: counter(category) }
  end

  def destroy
    log_out!
    redirect_to root_url
  end

  private
  def access_params
    params.require(:access).permit(:password)
  end

  def counter(category)
    MarkReader.new[category] || 1
  end

  def grant_access!
    session[:token] = User.first.set_session_token!
  end

  def log_out!
    session[:token] = nil
    User.first.set_session_token!
  end

  def redirect_to_sign_in
    redirect_to new_access_url unless admin_signed_in?
  end
end