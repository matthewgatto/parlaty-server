class Action < ApplicationRecord
  belongs_to :device, optional: false
  has_many_attached :visuals, dependent: :destroy #image/video/pdf
end
