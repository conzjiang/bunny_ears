class Api::TvShowsController < ApplicationController
  def index
    @tv_shows = TvShow.all.shuffle
  end

  def create
    @tv_shows = TvShow.create!(tv_params)
    render :index
  end

  private
  def tv_params
    params[:tv_show].values
  end
end