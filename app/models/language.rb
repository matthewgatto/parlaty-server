class Language < ApplicationRecord

  has_many :procedures

  validates :name, :abbreviation, :default_name, presence: true
  validates :abbreviation, :default_name, uniqueness: true
end
