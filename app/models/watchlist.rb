class Watchlist < ActiveRecord::Base
  STATUSES = ["Watching", "Plan to Watch", "Completed", "Dropped"]
  enum status: STATUSES

  belongs_to :watcher, class_name: "User"
  belongs_to :tv_show
end