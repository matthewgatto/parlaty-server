class Device < ApplicationRecord
    #since mysql doesn't have native array type
    serialize :actions_order, Array

    #belongs_to :oem_business, optional: false
    belongs_to :procedure, optional: true
    has_many :steps, dependent: :nullify
    has_many :actions, dependent: :destroy
    has_many :children, foreign_key: :parent_id, class_name: 'Device', dependent: :destroy

    scope :all_devices, -> { includes(:actions) }

end
