# frozen_string_literal: true

class ProcedurePolicy < ApplicationPolicy
  def index?
    true
  end

  def all_procedures_for_user?
    !operator?
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

  def reorder?
    create?
  end

  def destroy?
    create?
  end

  def copy?
    create?
  end

  def permitted_attributes
    [
      :name,
      :description,
      :author,
      :language_id,
      :version,
      :steps_order,
      oem_business_ids: []
    ]
  end
end
