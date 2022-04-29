# frozen_string_literal: true

class OemPolicy < ApplicationPolicy
  def index?
    parlaty_admin?
  end

  def create?
    index?
  end

  def update?
    parlaty_admin? || client_admin?
  end

  def destroy?
    index?
  end

  def setup_intent?
    true
  end

  def update_subscription?
    true
  end

  def subscription?
    true
  end

  def subscription_plans?
    true
  end

  def permitted_attributes(type)
    return [:name, :procedures_limit] if type == Users::Role::ADMIN_ROLE.classify.to_s
    [:name]
  end
end
