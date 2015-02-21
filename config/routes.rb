Rails.application.routes.draw do
  root to: "app#index"

  get "admin", to: "app#admin", as: "admin"

  resources :tv_shows, only: [:create]
end
