class AddTmdbIdToTvShows < ActiveRecord::Migration
  def change
    add_column :tv_shows, :tmdb_id, :integer
  end
end
