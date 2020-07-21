# frozen_string_literal: true

class DevicePolicy < ApplicationPolicy
  def index?
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

  def permitted_attributes
    [:name, :procedure_id]
  end

  def actions_permitted_attributes
    [
      :name,
      :parameter_name,
      :parameter_value_8_pack,
      :time,
      :mode
    ]
  end
end
