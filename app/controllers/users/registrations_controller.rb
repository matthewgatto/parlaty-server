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
    ParlatyAdmin.new(roleable_params('ParlatyAdmin'))
  end

  def clientadmin_role
    ClientAdmin.new(roleable_params('ClientAdmin'))
  end

  def author_role
    Author.new(roleable_params('Author'))
  end

  def operator_role
    Operator.new(roleable_params('Operator'))
  end

  def roleable_params(type)
    params.require(:user).permit(policy(User.new).roleable_permitted_attributes(type))
  end

  protected

  #If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
     devise_parameter_sanitizer.permit(:sign_up, keys: [:email])
  end

end
