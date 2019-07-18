Rails.application.routes.draw do
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

  get '/operators/procedures', to: 'procedures#operator_index'


  # put '/reorder', to: 'steps#reorder'

  post '/login', to: 'sessions#create'

  post '/steps/:id/visuals', to: 'steps#add_visuals'

  get '/oems/oembusinesses', to: 'oem_businesses#show'

  put '/oems/:id', to: 'oems#update'


end


