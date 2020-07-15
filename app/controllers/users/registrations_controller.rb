# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  include RequireLogin
  before_action :require_login, only: [:create]

  # POST /resource
  def create
    begin
      build_resource(sign_up_params)
      authorize resource
      resource.transaction do
        resource.roleable = send("#{params[:roleable]}_role")
        resource.save
      end
      yield resource if block_given?
      if resource.persisted?
        if resource.active_for_authentication?
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
    rescue
      render json: ApplicationSerializer.error_response(I18n.t("errors.user.incorrect_role")), status: :bad_request and return
    end
  end

  private

  def parlatyadmin_role
    ParlatyAdmin.create(user_params)
  end

  def clientadmin_role
    role_able = ClientAdmin.create(user_params)
    oem = Oem.find(params[:client])
    oem.client_admins << role_able
    role_able
  end

  def author_role
    role_able = Author.create(user_params)
    params[:categories].each do |c_id|
      oem_business = OemBusiness.find(c_id)
      oem_business.authors << role_able
    end
    role_able
  end

  def operator_role
    role_able = Operator.create(user_params)
    params[:categories].each do |c_id|
      oem_business = OemBusiness.find(c_id)
      oem_business.operators << role_able
    end
    role_able
  end

  def user_params
    params.require(:user).permit(:name)
  end

  protected

  #If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
     devise_parameter_sanitizer.permit(:sign_up, keys: [:email])
  end

end
