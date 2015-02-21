class Api::TvShowsController < ApplicationController
  def index
    @tv_shows = TvShow.all
  end
end