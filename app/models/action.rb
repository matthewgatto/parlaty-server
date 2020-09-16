class Action < ApplicationRecord
  belongs_to :device, optional: false
  has_many :children, foreign_key: :parent_id, class_name: 'Action', dependent: :destroy
  has_many_attached :visuals, dependent: :destroy #image/video/pdf
end
