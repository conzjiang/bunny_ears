class AppController < ApplicationController
  before_action :require_admin, except: [:index]

  def index
  end
end