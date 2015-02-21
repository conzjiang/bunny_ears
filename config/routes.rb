Rails.application.routes.draw do
  root to: "app#index"

  get "admin", to: "app#admin", as: "admin"

  namespace :api, defaults: { format: :json } do
    resources :tv_shows, only: [:index, :create]
    put "tv_shows/update", to: "tv_shows#update"
  end
end
