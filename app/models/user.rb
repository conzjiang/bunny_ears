class User < ActiveRecord::Base
  include BCrypt

  has_many :watchlists, foreign_key: :watcher_id
  has_many :watchlist_shows, through: :watchlists, as: :tv_show

  def self.valid_admin_password?(password)
    Password.new(ENV["PW_DIGEST"]).is_password?(password)
  end

  def password=(password)
    self.password_digest = Password.create(password)
  end

  def set_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end
end