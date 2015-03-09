require File.expand_path('../boot', __FILE__)
require 'rails/all'

Bundler.require(*Rails.groups)

module BunnyEars
  class Application < Rails::Application
    config.autoload_paths << Rails.root.join('app/services')

    config.paperclip_defaults = {
      :storage => :s3,
      :s3_protocol => 'http',
      :url => ':s3_domain_url',
      :path => '/:class/:attachment/:id_partition/:style/:filename',
      :s3_credentials => {
        :bucket => ENV['S3_BUCKET'],
        :access_key_id => ENV['S3_ACCESS_KEY'],
        :secret_access_key => ENV['S3_SECRET_ACCESS_KEY']
      }
    }

    config.assets.paths << Rails.root.join("app", "assets", "fonts")
  end
end
