Rails.application.routes.draw do
  root 'shell#index'
  devise_for :users, controllers: { confirmations: 'users/confirmations',
    registrations: 'users/registrations'}

  devise_scope :user do
    post "/users/confirmation/password", to: "users/confirmations#confirmation_password"
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

  resources :operators, only: [:update, :destroy]

  resources :oem_businesses, only: [:show]

  resources :operator_admins, only: [:update, :destroy]

  get '/oem_businesses/:id/operator_admins', to: 'operator_admins#oembus_oadmin_index'

  get '/operator_admins/:id/operators', to: 'operators#oadmin_op_index'

  get '/oem_businesses/:id/operators', to: 'operators#oembus_op_index'

  get '/operators/:id/procedures', to: 'procedures#operator_prod_index'

  get '/oem_businesses/:id/procedures', to: 'procedures#oembusiness_prod_index'

  #JDT
  put '/procedures/:id', to: 'procedures#update'

  post '/login', to: 'sessions#create'

  post '/steps/:id/visuals', to: 'steps#add_visuals'

  get '/oems/:id/oem_businesses', to: 'oem_businesses#oem_oembus_index'

  put '/oems/:id', to: 'oems#update'

  post '/save_steps', to: 'steps#save_step'

  post '/csv_steps', to: 'steps#csv_steps'

  get '/oems', to: 'oems#index'

end
