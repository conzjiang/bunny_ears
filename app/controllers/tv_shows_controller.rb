class TvShowsController < ApplicationController
  def create
    tvs = TvShow.create!(tv_params)
    render json: tvs
  end

  private
  def tv_params
    params[:tv_show].values
  end
end