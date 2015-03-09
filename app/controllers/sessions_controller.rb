class SessionsController < ApplicationController
  def create
    login!(omniauth.user)

    if omniauth.new_user?
      redirect_to edit_user_url
    else
      redirect_to root_url
    end
  end

  private
  def omniauth
    @omniauth ||= OmniAuthorize.new(request.env["omniauth.auth"])
  end
end