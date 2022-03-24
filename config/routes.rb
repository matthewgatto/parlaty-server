Rails.application.routes.draw do
  root 'dashboard#index'
  devise_for :users, controllers: { 
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }, 
  defaults: { 
    format: :json 
  }

  devise_scope :user do
    post "/users/confirmation/password", to: "users/confirmations#confirmation_password"
    get "/users/reset_password", to: "users/passwords#edit"
    get "/reset-password", to: "users/passwords#edit"
  end

  get '/oem_businesses/:id/procedures', to: 'procedures#index'
  resources :procedures, only: [:show, :create, :update, :destroy] do
    collection do
      get 'all_procedures_for_user'
    end
    member do
      put 'reorder'
      put 'used'
      post 'copy'
    end
  end

  resources :users do
    member do
      get 'refresh'
    end
  end
  post '/login', to: 'sessions#create'
  resources :languages, only: [:index]
  resources :oems, only: [:index, :create, :update, :destroy]
  resources :devices, only: [:index, :create, :update, :destroy]

  get '/oems/:id/oem_businesses', to: 'oem_businesses#index'
  get '/oems/:id/setup_intent', to: 'oems#setup_intent'
  resources :oem_businesses, only: [:create, :show, :destroy]
  resources :comments, only: [:create, :update, :destroy] do
    collection do
      post 'delete_all'
    end
    member do
      post 'readed'
    end
  end

  resources :steps, only: [:create, :update, :destroy]
  post '/csv_steps', to: 'steps#csv_steps'
  post '/stripe/subscription' => 'stripe#subscription_update'
  post '/stripe/payment_method' => 'stripe#payment_method_update'

end
