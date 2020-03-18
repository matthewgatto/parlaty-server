class Action < ApplicationRecord
    belongs_to :device, optional: false
    has_many :action_copies, dependent: :destroy
end
