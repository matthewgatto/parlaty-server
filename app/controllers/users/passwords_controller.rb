# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
     super
     render json: { "status": "success", "reset_password_token": params[:reset_password_token] }, status: :ok
  end
end
