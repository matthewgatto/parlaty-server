class OemPolicy < ApplicationPolicy

  def index?
    parlaty_admin?
  end

  def create?
    index?
  end

  def update?
    parlaty_admin? || !client_admin?
  end

  def destroy?
    index?
  end

  def permitted_attributes
    [ :name, ]
  end

end