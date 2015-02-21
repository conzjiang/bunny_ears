Rails.application.routes.draw do
  root to: "app#index"

  get "admin", to: "app#admin", as: "admin"
end
