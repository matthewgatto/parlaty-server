# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    parlaty_admin? || client_admin?
  end

  def show?
    true
  end

  def create?
    index?
  end

  def update?
    index?
  end

  def destroy?
    index?
  end

  def refresh?
    true
  end

  def permitted_attributes
    [:email, :language, :voice]
  end

  def roleable_permitted_attributes(type)
    return [:name] if type == Users::Role::ADMIN_ROLE.classify.to_s
    return [:name, :oem_id] if type == Users::Role::CLIENT_ADMIN_ROLE.classify.to_s
    [:name, oem_business_ids: []]
  end

end
