Rails.application.routes.draw do
  root to: "app#index"

  resource :access, only: [:new, :create, :destroy], controller: "access"
  get 'admin', to: "access#show"

  namespace :admin, defaults: { format: :json } do
    resources :tv_shows, only: [:index, :create]
    put "tv_shows/update", to: "tv_shows#update"
  end

  namespace :api, defaults: { format: :json } do
    resources :tv_shows, only: [:index]
  end
end
