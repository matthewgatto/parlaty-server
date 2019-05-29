Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 		'/steps', 		to: 'steps#index'
  get			'/steps/:id',	to: 'steps#show'
  post 		'/steps', 		to: 'steps#create'
  put 		'/steps/:id', to: 'steps#update'
  delete  '/steps/:id', to: 'steps#destroy'
end
