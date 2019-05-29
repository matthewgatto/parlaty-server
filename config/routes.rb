Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # api only app doesn't have new, edit path
  resources :steps
  resources :procedures

end
