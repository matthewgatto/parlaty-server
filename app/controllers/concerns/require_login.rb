# frozen_string_literal: true

module RequireLogin
  extend ActiveSupport::Concern

  included do
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  end

  private

  def user_not_authorized(exception)
    render json: ApplicationSerializer.error_response(I18n.t("pundit.access_denied")), status: :forbidden
  end

  # check if user is logged in(check for token), if so assign @user_id
  def require_login
    token = request.env["HTTP_AUTHORIZATION"]
    (head :unauthorized and return) unless token
    token_match = token.match(/Bearer\s(.*)/)
    (head :unauthorized and return) if token_match.blank?
    decoded = Auth.decode(token_match[1])
    @user_id = decoded["uid"]
  end

  def permitted_user?(user, oem_business)
    user.parlaty_admin? ||
      user.client_admin? ||
      oem_business.author_ids.include?(user.roleable.id) ||
      oem_business.operator_ids.include?(user.roleable.id)
  end

end