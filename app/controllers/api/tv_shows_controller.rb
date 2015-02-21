class Api::TvShowsController < ApplicationController
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
    params[:tv_show].each do |tv_id, image|
      TvShow.find(tv_id).update!(image: image)
    end

    head :ok
  end

  private
  def tv_params
    params[:tv_show].values
  end

  def update_mark!
    new_mark = { params[:mark][:category] => params[:mark][:counter]}
    MarkReader.new.update!(new_mark)
  end
end