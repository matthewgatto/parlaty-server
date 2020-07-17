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

  resources :procedures, only: [:show, :create, :update, :destroy] do
      member do
        put 'reorder'
        put 'used'
        put 'copy'
      end
  end

  resources :users do
    member do
      get 'refresh'
    end
  end
  post '/login', to: 'sessions#create'

  resources :oems, only: [:index, :create, :update, :destroy]
  resources :steps, only: [:create, :update, :destroy]
  resources :devices, only: [:create, :update, :destroy]
  resources :oem_businesses, only: [:create, :show, :destroy]

  get '/oems/:id/oem_businesses', to: 'oem_businesses#index'
  get '/oem_businesses/:id/procedures', to: 'procedures#index'

  #JDT

  post '/steps/:id/visuals', to: 'steps#add_visuals'

  post '/save_steps', to: 'steps#save_step'

  post '/csv_steps', to: 'steps#csv_steps'

  post '/devices/:id', to: 'devices#create'

  put '/devices/:id', to: 'devices#update'

  delete '/devices/:id', to: 'devices#destroy'

  get '/devices', to: 'devices#devices_index'
end
