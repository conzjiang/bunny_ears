class TvShow < ActiveRecord::Base
  validates :title, presence: true
  validates :tmdb_id, uniqueness: true, allow_nil: true

  has_attached_file :image,
    :styles => {
      :medium => "300x400>"
    }

  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end