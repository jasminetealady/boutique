Rails.application.routes.draw do

  #Home
  root 'welcome#home'

  #Facebook Omniauth
  get '/auth/facebook/callback', to: 'sessions#create'

  #User Signup

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  #User Login
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  #Items
  get '/items/:id/add_to_cart', to: 'items#add_to_cart'
  get '/items/:id/remove_from_cart', to: 'items#remove_from_cart'

  #Cart
  get '/cart', to: 'carts#show'

  #Orders/Checkout
  get '/checkout', to: 'orders#new'
  post '/checkout', to: 'orders#create'

  #Shop
  get '/shop', to: 'items#index'
  resources :items, only: [:show]

end
