json.tv_shows @tv_shows do |tv|
  json.extract! tv, :id, :title
  json.image_url tv.image.url if tv.image_file_name.present?
end

json.key ENV["TMDB_KEY"]

json.errors @errors