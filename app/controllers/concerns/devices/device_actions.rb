# frozen_string_literal: true

module Devices
  # DeviceActions
  module DeviceActions
    extend ActiveSupport::Concern

    included do
    end

    private

    def update_step_device(step, device_id)
      if step.device.present? && device_id.blank?
        step.device.destroy
        return false
      end
      return false if device_id.blank?

      device = Device.find(device_id)
      return false unless device

      device.parent_id.present? ?
        save_device_actions(device, is_dup: true) :
        create_dup_device(device, step)
    end

    def create_dup_device(device, step)
      new_device = device.dup
      new_device.parent_id = device.id
      new_device.save
      save_device_actions(new_device, is_dup: true, from_parent: true)
      step.device = new_device
      step.save
    end

    def save_device_actions(device, options ={})
      device.transaction do
        order = actions_params.map do |item|
          update_actions(device, item, options)
        end
        remove_not_used_actions(device, order) unless options[:is_dup]
        device.actions_order = order
        device.save
      end
    end

    def update_actions(device, item, options)
      new_params = action_params(item)
      if options[:is_dup]
        options[:from_parent] ? create_dup_action(new_params, device) : update_action(new_params)
      else
        new_params[:id].present? ? update_action(new_params) : create_action(new_params, device)
      end
    end

    def create_dup_action(item, device)
      action = Action.find(item[:id])
      new_action = action.dup
      new_action.device = device
      new_action.save
      new_action.update_attributes(item.except(:id))
      new_action.id
    end

    def create_action(item, device)
      action = Action.new(item)
      action.device = device
      action.save
      action.id
    end

    def update_action(item)
      action = Action.find(item[:id])
      action.update_attributes(item)
      action.id
    end

    def remove_not_used_actions(device, order)
      Action.find(device.actions_order - order).each(&:destroy)
    end
  end
end
