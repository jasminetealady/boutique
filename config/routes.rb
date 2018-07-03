Rails.application.routes.draw do

  #Home
  root 'welcome#home'
  get '/newpage', to: 'welcome#new_page'

  #Facebook Omniauth
  get '/auth/facebook/callback', to: 'sessions#create'

  #User Signup

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/account', to: 'users#show'

  resources :users do
    resources :orders
  end

  #User Login
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  #Items
  resources :items

  #Cart
  get '/cart', to: 'carts#show'
  get '/clearcart', to: 'carts#destroy'

  #Orders/Checkout
  get '/checkout', to: 'orders#new'
  post '/checkout', to: 'orders#create'

  #Shop
  get '/shop', to: 'items#index'
  resources :items, only: [:show]

  #Reviews
  resources :reviews, only: [:create]

end
