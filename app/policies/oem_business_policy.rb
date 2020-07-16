# frozen_string_literal: true

class OemBusinessPolicy < ApplicationPolicy
  def index?
    parlaty_admin? || author? || operator?
  end

  def show?
    true
  end

  def create?
    parlaty_admin? || client_admin?
  end

  def destroy?
    create?
  end

  def permitted_attributes
    [:name, :oem_id]
  end
end
