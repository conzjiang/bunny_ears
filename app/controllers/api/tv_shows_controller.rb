class Api::TvShowsController < ApplicationController
  def index
    @tv_shows = TvShow.all
  end

  def create
    @tv_show = TvShow.new(tv_params)
    @tv_show.save!
    render :show
  end

  private
  def tv_params
    params.require(:tv_show).permit(:title)
  end
end