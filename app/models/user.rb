class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
   
  # roleable calls destory when user gets destroyed       
  belongs_to :roleable, polymorphic: true, optional: true, dependent: :destroy


  protected

  #override devise definition so that password isn't require at initial sign_up
  def password_required?
    confirmed? ? super : false
  end

  # #override devise defintion to not allow deactivated accounts to login
  # def active_for_authentication?
  #   super && !deactivated
  # end

end
