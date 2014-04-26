PlanetDarts::Application.routes.draw do

  root "pages#index"
  devise_for :users
  # resources :users, :only => [:create, :new, :show, :destroy]
  resources :pages, only: [:index, :new, :create]
  resources :scores, only: [:create]
  resources :locations, only: [:create, :new]
end
