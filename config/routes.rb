Rails.application.routes.draw do
  root 'shell#index'
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

  #JDT
  put '/procedures/:id', to: 'procedures#update'

  delete '/procedures/:id', to: 'procedures#destroy'

  post '/procedures/:id/copy', to: 'procedures#copy'

  put '/procedures/:id/update_categories', to: 'procedures#update_categories'

  post '/login', to: 'sessions#create'

  post '/steps/:id/visuals', to: 'steps#add_visuals'

  get '/oems/:id/oem_businesses', to: 'oem_businesses#oem_oembus_index'

  put '/oems/:id', to: 'oems#update'

  post '/save_steps', to: 'steps#save_step'

  post '/csv_steps', to: 'steps#csv_steps'

  get '/oems', to: 'oems#index'

  post '/oem', to: 'oems#create'

  post '/devices/:id', to: 'devices#create'

  put '/devices/:id', to: 'devices#update'

  delete '/devices/:id', to: 'devices#destroy'

  get '/devices', to: 'devices#devices_index'

  get '/users', to: 'users#users_index'

  get '/users/:id', to: 'users#show'

  post '/users/:id', to: 'users#create'

  put '/users/:id', to: 'users#update'

  delete '/users/:id', to: 'users#destroy'

end
