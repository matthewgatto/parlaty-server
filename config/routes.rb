Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # api only app doesn't provide default new, edit path for resources

  resources :procedures, only: [:show, :create, :update, :destroy] do
 		resources :steps, only: [:show, :create, :update, :destroy]
  end

  put '/procedures/:id/reorder', to: 'steps#reorder'
  
  resources :parlaty_admins, only: [:create, :show, :update, :destroy]
  resources	:oems, only: [:index, :show, :create, :update]

end
