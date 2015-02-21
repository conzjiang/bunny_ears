json.extract! tv_show, :id, :title
json.image_url tv_show.image.url if tv_show.image_file_name.present?