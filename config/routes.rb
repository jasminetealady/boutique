Rails.application.routes.draw do

  #Home
  root 'welcome#home'

  #Facebook Omniauth
  get '/auth/facebook/callback', to: 'sessions#create'

  #User Signup
  resources :users, only: [:create]
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  #User Login
  get '/login', to: 'sessions#new'

  #Cart
  get '/cart', to: 'carts#show'

  #Orders/Checkout
  get '/checkout', to: 'orders#new'
  post '/checkout', to: 'orders#create'

  #Shop
  get '/shop', to: 'items#index'

end
