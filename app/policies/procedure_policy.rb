# frozen_string_literal: true

class ProcedurePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    index?
  end

  def create?
    !operator?
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def permitted_attributes
    [name, :version, :description, :category, :author, :language]
  end
end
