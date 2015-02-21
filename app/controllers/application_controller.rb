class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private
  def require_admin
    unless admin_signed_in?
      render json: "Access Denied", status: 403
    end
  end

  def admin_signed_in?
    return false unless session[:token]
    User.first.session_token == session[:token]
  end
end
