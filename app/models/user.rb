class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
   
  # roleable calls destory when user gets destroyed       
  belongs_to :roleable, polymorphic: true, optional: true, dependent: :destroy

  Users::Role::ROLES.each do |r|
    define_method "#{r}?" do
      roleable_type.to_s == r.classify.to_s
    end
  end

  protected

  #override devise definition so that password isn't require at initial sign_up
  def password_required?
    confirmed? ? super : false
  end

end
