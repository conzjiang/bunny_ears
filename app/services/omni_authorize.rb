class OmniAuthorize
  attr_reader :auth_hash, :user

  def initialize(auth_hash)
    @auth_hash = auth_hash
    @new_user = false

    find_or_create_user_by_auth_hash
  end

  def find_or_create_user_by_auth_hash
    @user = User.find_or_initialize_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )

    unless @user.persisted?
      @new_user = true
      @user.update!(email: auth_hash[:info][:email])
    end
  end

  def new_user?
    @new_user
  end
end