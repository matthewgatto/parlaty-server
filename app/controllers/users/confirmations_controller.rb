# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      set_flash_message!(:notice, :confirmed)
      #respond_with_navigational(resource){ redirect_to after_confirmation_path_for(resource_name, resource) }
      logger.info "*** resource_name: " + resource_name.to_s
      logger.info "*** resource: " + resource.to_s
      render :template => "users/confirmations/show", :formats => :html
    else
      respond_with_navigational(resource.errors, status: :unprocessable_entity){ render :new }
    end
  end

  # POST /users/confirmation/password?confirmation_token=abcdef
  # if confirmation_token matches a user, and password 
  def confirmation_password
    @user = User.confirm_by_token(params[:user][:confirmation_token])
    if @user.id.present? && @user.update_attributes(password: params[:user][:password])
      @user.confirm
      render json: ApplicationSerializer.role_as_json(@user.roleable_type), status: :ok
    else
      render json: ApplicationSerializer.error_response(@user.errors.messages)
    end
  end

  protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

end
