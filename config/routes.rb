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

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # api only app doesn't provide default new, edit path for resources

  resources :procedures, only: [:show, :create] do
      member do
        put 'reorder'
        put 'used'
      end
  end

  resources :users do
    member do
      get 'refresh'
    end
  end
  resources :oems, only: [:index, :create, :update, :destroy]
  resources :steps, only: [:create, :update, :destroy]
  resources :devices, only: [:create, :update, :destroy]
  resources :operators, only: [:update, :destroy]
  resources :oem_businesses, only: [:show]
  resources :operator_admins, only: [:update, :destroy]

  get '/oem_businesses/:id/operator_admins', to: 'operator_admins#oembus_oadmin_index'

  get '/operator_admins/:id/operators', to: 'operators#oadmin_op_index'

  get '/oem_businesses/:id/operators', to: 'operators#oembus_op_index'

  get '/operators/:id/procedures', to: 'procedures#operator_prod_index'

  get '/oem_businesses/:id/procedures', to: 'procedures#oembusiness_prod_index'

  post '/oem_businesses', to: 'oem_businesses#create'

  delete '/oem_businesses/:id', to: 'oem_businesses#destroy'

  #JDT
  put '/procedures/:id', to: 'procedures#update'

  delete '/procedures/:id', to: 'procedures#destroy'

  post '/procedures/:id/copy', to: 'procedures#copy'

  put '/procedures/:id/update_categories', to: 'procedures#update_categories'

  post '/login', to: 'sessions#create'

  post '/steps/:id/visuals', to: 'steps#add_visuals'

  get '/oems/:id/oem_businesses', to: 'oem_businesses#index'

  post '/save_steps', to: 'steps#save_step'

  post '/csv_steps', to: 'steps#csv_steps'

  post '/devices/:id', to: 'devices#create'

  put '/devices/:id', to: 'devices#update'

  delete '/devices/:id', to: 'devices#destroy'

  get '/devices', to: 'devices#devices_index'
end
