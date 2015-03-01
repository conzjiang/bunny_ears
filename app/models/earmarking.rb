class Earmarking < ActiveRecord::Base
  validates :earmark, :tv_show_id, presence: true
  validates :earmark, uniqueness: { scope: :tv_show_id }

  belongs_to :earmark, inverse_of: :earmarkings
  belongs_to :tv_show
end