class Admin::TvShowsController < ApplicationController
  before_action :require_admin

  def index
    @tv_shows = TvShow.order(created_at: :desc)
  end

  def create
    @errors = []

    tv_params.each do |attrs|
      tv = TvShow.create(attrs)
      unless tv.persisted?
        @errors << "#{tv.title} has already been added."
      end
    end

    update_mark!
    @tv_shows = TvShow.order(created_at: :desc)

    render :index
  end

  def update
    tv = TvShow.find(params[:id])
    tv.update!(tv_show_params)
    render json: tv
  end

  def update_all
    params[:tv_show].each do |tv_id, image|
      TvShow.find(tv_id).update!(image: image)
    end

    render json: {}
  end

  def destroy
    tv = TvShow.find(params[:id])
    tv.destroy!
    render json: tv
  end

  private
  def tv_params
    params[:tv_show].values
  end

  def tv_show_params
    params.require(:tv_show).permit(:title)
  end

  def update_mark!
    new_mark = { params[:mark][:category] => params[:mark][:counter]}
    MarkReader.new.update!(new_mark)
  end
end