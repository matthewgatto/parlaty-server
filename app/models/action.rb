class Action < ApplicationRecord
    belongs_to :device, optional: false
end
