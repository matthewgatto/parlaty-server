class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
   
  # roleable calls destory when user gets destroyed       
  belongs_to :roleable, polymorphic: true, optional: true, dependent: :destroy
  has_many :comments, foreign_key: :author_id, dependent: :destroy
  has_many :operations, foreign_key: :operator_id

  Users::Role::ROLES.each do |r|
    define_method "#{r}?" do
      roleable_type.to_s == r.classify.to_s
    end
  end

  def deactivated?
    roleable.deactivated if author? || operator?
  end

  protected

  #override devise definition so that password isn't require at initial sign_up
  def password_required?
    confirmed? ? super : false
  end

end
