Confapp::Application.routes.draw do
  

  resources :participants

  get "agenda/index"
  get "agenda/list"

  root :to => "agenda#index"

  devise_for :users
  resources :users, :only => :show

  get 'question/index'
  get 'question/moderate'
  get 'question/new'

  match 'question', :to => 'question#create', format: :json, :via => :post
  match 'question', :to => 'question#list', format: :json, :via => :get
  match 'question/:id', :to => 'question#update', format: :json, :via => :put


  match 'agenda/index', :to => 'agenda#index', format: :json, :via => :get
  match 'agenda', :to => 'agenda#list', format: :json, :via => :get

  match 'agenda/loaddata', :to => 'agenda#loadData', format: :json, :via => :get
  match 'agenda/create', :to => 'agenda#create', format: :json, :via => :get
  match 'agenda/createpanelist', :to => 'agenda#createPanelist', format: :json, :via => :get


  match "*rest" => "agenda#index"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
