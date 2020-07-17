# frozen_string_literal: true

class OemBusinessPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    index?
  end

  def create?
    parlaty_admin? || client_admin?
  end

  def destroy?
    !operator?
  end

  def permitted_attributes
    [:name, :oem_id]
  end
end
