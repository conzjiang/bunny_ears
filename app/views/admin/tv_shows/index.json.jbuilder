json.tv_shows @tv_shows, partial: "api/tv_shows/tv_show", as: :tv_show

json.key ENV["TMDB_KEY"]

json.errors @errors