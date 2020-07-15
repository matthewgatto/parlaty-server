# frozen_string_literal: true

module RequireLogin
  extend ActiveSupport::Concern

  included do
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  end

  private

  def user_not_authorized(exception)
    render json: { error: I18n.t("pundit.access_denied") }, status: :forbidden
  end

  # check if user is logged in(check for token), if so assign @user_id
  def require_login
    token = request.env["HTTP_AUTHORIZATION"]
    (head :unauthorized and return) unless token

    token_match = token.match(/Bearer\s(.*)/)
    if token_match.present?
      decoded = Auth.decode(token_match[1])
      @user_id = decoded["uid"]
    else
      head :unauthorized and return
    end
  end

end