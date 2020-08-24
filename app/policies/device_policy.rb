# frozen_string_literal: true

class DevicePolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    !operator?
  end

  def update?
    !operator?
  end

  def destroy?
    !operator?
  end

  def permitted_attributes
    [:name, :procedure_id]
  end

  def actions_permitted_attributes
    [:id, :name, :parameter_name, :parameter_value_8_pack, :time, :mode,
      visuals: []
    ]
  end
end
