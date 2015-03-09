Rails.application.routes.draw do
  root to: "app#index"

  resource :access, only: [:new, :create, :destroy], controller: "access"
  get 'admin', to: "access#show"

  get "auth/facebook/callback", to: "sessions#create"

  resource :user, only: [:edit, :update]

  namespace :admin, defaults: { format: :json } do
    put "tv_shows/update", to: "tv_shows#update_all"
    resources :tv_shows, only: [:index, :create, :show, :update, :destroy]
  end

  namespace :api, defaults: { format: :json } do
    resources :tv_shows, only: [:index, :create]
  end
end
