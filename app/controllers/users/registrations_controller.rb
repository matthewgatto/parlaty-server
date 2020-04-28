# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  #before_action :require_login, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    # only p_admin can create oem
    # if ((current_user.roleable_type != "ParlatyAdmin") && params[:roleable] == "oem")
    #   render json: {"error": "Current user not an ParlatyAdmin"}, status: :forbidden and return
    # only operator admin can create operator
    # elsif ()
    #end

    case params[:roleable]
    when "oem"
      @roleable = Oem.create(name: params[:user][:name])
    when "parlatyadmin"
      @roleable = ParlatyAdmin.create(name: params[:user][:name])
    when "clientadmin"
      @roleable = ClientAdmin.create(name: params[:user][:name])
      client_id = params[:client].to_i
      oem = Oem.find(client_id)
      oem.client_admins << @roleable
    when "operator"
      # has many oem_businesses which is categories on the ui
      @roleable = Operator.create(name: params[:user][:name])
      params[:categories].each do |c_id|
        oem_business = OemBusiness.find(c_id)
        oem_business.operators << @roleable
      end
    when "author"
      # has many oem_businesses which is categories on the ui
      @roleable = Author.create(name: params[:user][:name])
      params[:categories].each do |c_id|
        oem_business = OemBusiness.find(c_id)
        oem_business.authors << @roleable
      end
    else
      render json: { "error": "roleable type doesn't exist" }, status: :bad_request and return
    end
    #devise's code, mailer is called within build_resource
    build_resource(sign_up_params)
    resource.save
    #@roleable.save

    if(!resource.update_attribute(:roleable, @roleable))
      render json: { "error": "roleable type not updated to user, but user email has been sent out" }, status: :bad_request and return
    end
    resource.save
    #devise's code
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  #If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
     devise_parameter_sanitizer.permit(:sign_up, keys: [:email])
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

end
