class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?

  private
  def admin_signed_in?
    return false unless session[:token]
    User.first.session_token == session[:token]
  end

  def current_user
    return nil unless session[:token]
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def require_admin
    unless admin_signed_in?
      render json: "Access Denied", status: 403
    end
  end

  def login!(user)
    session[:token] = user.set_session_token!
  end

  def signed_in?
    !!current_user
  end
end
