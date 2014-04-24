PlanetDarts::Application.routes.draw do
  root "pages#index"
  devise_for :users
  resources :pages, only: [:index]
  resources :users
  resources :sessions
  resources :scores, only: [:create]
end
