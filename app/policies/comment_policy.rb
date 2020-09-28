# frozen_string_literal: true

# CommentPolicy
class CommentPolicy < ApplicationPolicy
  def create?
    true
  end

  def readed?
    !operator?
  end

  def update?
    !operator?
  end

  def destroy?
    true
  end

  def delete_all?
    !operator?
  end

  def permitted_attributes
    %i[
      text
      author_id
      step_id
      readed
    ]
  end
end
