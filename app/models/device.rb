class Device < ApplicationRecord
    has_many :actions, dependent: :destroy
end
