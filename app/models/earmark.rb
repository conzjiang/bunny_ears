class Earmark < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :earmarkings, inverse_of: :earmark
end