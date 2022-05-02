class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
   
  # roleable calls destory when user gets destroyed       
  belongs_to :roleable, polymorphic: true, optional: true, dependent: :destroy
  has_many :comments, foreign_key: :author_id, dependent: :destroy
  has_many :operations, foreign_key: :operator_id

  after_save :update_subscription

  scope :client_admin, -> { where(roleable_type:"ClientAdmin") }
  scope :parlaty_admin, -> { where(roleable_type: "ParlatyAdmin") }
  scope :authors, -> { where(roleable_type: "Author") }
  scope :operators, -> { where(roleable_type: "Operator") }

  delegate :oem, to: :roleable

  validates :email, presence: true, uniqueness: true

  Users::Role::ROLES.each do |r|
    define_method "#{r}?" do
      roleable_type.to_s == r.classify.to_s
    end
  end

  def deactivated?
    roleable.deactivated if author? || operator?
  end

  def oem_name
    oem_instance = self.oem
    return nil unless oem_instance.present?
    oem_instance.name
  end

  protected

  #override devise definition so that password isn't require at initial sign_up
  def password_required?
    confirmed? ? super : false
  end

  def update_subscription
    if self.roleable.present? && !self.roleable.is_a?(ParlatyAdmin)
      if self.oem.present?
        oem.subscription.update(user_count: oem.user_count)
      end
    end
  end

end
