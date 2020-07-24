# frozen_string_literal: true

module Devices
  # DeviceActions
  module DeviceActions
    extend ActiveSupport::Concern

    included do
    end

    private

    def update_device_actions
      Action.transaction do
        actions_params.map do |item|
          new_params = action_params(item)
          update_action(new_params)
        end
      end
    end

    def save_device_actions
      @device.transaction do
        order = actions_params.map do |item|
          new_params = action_params(item)
          new_params[:id].present? ? update_action(new_params) : create_action(new_params)
        end
        to_be_removed = @device.actions_order - order
        Action.find(to_be_removed).each(&:destroy)
        @device.actions_order = order
        @device.save
      end
    end

    def create_action(item)
      action = Action.new(item)
      action.device = @device
      action.save
      action.id
    end

    def update_action(item)
      action = Action.find(item[:id])
      action.update_attributes(item)
      action.id
    end

  end
end
