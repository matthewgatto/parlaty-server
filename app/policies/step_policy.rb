# frozen_string_literal: true

# StepPolicy
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
    %i[title
       device_id
       location
       note
       safety
       procedure_id
       loop_value
       mode
       time
       parameter_name
       parameter_value_8_pack
       spoken
    ]
  end

  def visuals_permitted_attributes
    [visuals: []]
  end

  def actions_permitted_attributes
    %i[id device_id name parameter_name parameter_value_8_pack time mode]
  end
end
