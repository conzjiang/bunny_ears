class TvShowsController < ApplicationController
  def create
    tvs = TvShow.create!(tv_params)
    render json: tvs
  end

  def update
    params[:tv_show].each do |tv_id, image|
      TvShow.find(tv_id).update!(image: image)
    end

    head :ok
  end

  private
  def tv_params
    params[:tv_show].values
  end
end