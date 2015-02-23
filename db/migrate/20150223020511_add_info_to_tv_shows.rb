class AddInfoToTvShows < ActiveRecord::Migration
  def change
    add_column :tv_shows, :start_year, :integer
    add_column :tv_shows, :end_year, :integer
    add_column :tv_shows, :description, :text
  end
end
