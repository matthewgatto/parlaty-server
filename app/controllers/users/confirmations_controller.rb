# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  # POST /users/confirmation/password?confirmation_token=abcdef
  # if confirmation_token matches a user, and password 
  def confirmation_password
    @user = User.confirm_by_token(params[:user][:confirmation_token])
    if(!@user.id.nil?)
      if(@user.update_attributes(password: params[:user][:password]))
        # confirmable method 
        @user.confirm
        render json: {} and return
      end
    end
    
    render json: { "error": @user.errors.full_messages }, status: :bad_request

  end

  protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

end
