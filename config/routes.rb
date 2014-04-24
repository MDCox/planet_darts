PlanetDarts::Application.routes.draw do
  devise_for :users

  root "pages#index"
  resources :pages, only: [:index]
  resources :users, only: [:new, :create]
  resources :sessions
end
