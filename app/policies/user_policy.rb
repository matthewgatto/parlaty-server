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
end
