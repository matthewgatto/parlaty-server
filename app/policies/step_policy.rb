# frozen_string_literal: true

class StepPolicy < ApplicationPolicy

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
    [:title,
     :device_id,
     :location,
     :note,
     :safety,
     :procedure_id,
     :mode,
     :time,
     :parameter_name,
     :parameter_value_8_pack,
     :spoken,
     :has_visual,
     visuals: []
    ]
  end
end
