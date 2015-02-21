class User < ActiveRecord::Base
  include BCrypt

  def self.valid_password?(password)
    Password.new(first.password_digest).is_password?(password)
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