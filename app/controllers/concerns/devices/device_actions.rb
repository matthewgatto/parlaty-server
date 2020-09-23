# frozen_string_literal: true

module Devices
  # DeviceActions
  module DeviceActions
    extend ActiveSupport::Concern

    included do
    end

    private

    def update_device_actions(device, action, device_actions_params)
      save_device_actions(device, device_actions_params)
      update_children_device_actions(device) if action.eql?('update')
    end

    def update_children_device_actions(device)
      device.children.each do |child|
        child.name = device.name
        child.machine_tag = device.machine_tag
        save_device_actions(child, device.actions, is_dup_actions: true)
      end
    end

    def update_step_device(step, device_id, device_actions_params)
      if step.device.present? && device_id.blank?
        step.device.destroy
        return false
      end
      return false if device_id.blank?

      device = Device.find(device_id)
      return false unless device

      device.parent_id.present? ?
        save_device_actions(device, device_actions_params, is_dup_device: true) :
        create_dup_device(device, step, device_actions_params)
    end

    def create_dup_device(device, step, device_actions_params)
      step.device.destroy if step.device&.parent_id.present?
      new_device = device.dup
      new_device.parent_id = device.id
      new_device.save
      save_device_actions(new_device, device_actions_params, is_dup_device: true, from_parent: true)
      step.device = new_device
      step.save
    end

    def save_device_actions(device, device_actions_params, options ={})
      device.transaction do
        order = device_actions_params.map do |item|
          options[:is_dup_actions] ? dup_actions(device, item) : update_actions(device, item, options)
        end
        remove_not_used_actions(device, order) unless options[:is_dup_device]
        device.actions_order = order
        device.save
      end
    end

    def dup_actions(device, item)
      new_action = dup_action(item, device)
      update_attached_files(new_action, item)
      new_action.id
    end

    def update_actions(device, item, options)
      new_params = action_params(item)
      if options[:is_dup_device]
        options[:from_parent] ? create_dup_action(new_params, device) : update_action(new_params)
      else
        new_params[:id].present? ? update_action(new_params) : create_action(new_params, device)
      end
    end

    def dup_action(action, device)
      new_action = action.dup
      new_action.parent_id = action.id
      new_action.device = device
      new_action.save
      new_action
    end

    def create_dup_action(item, device)
      action = Action.find(item[:id])
      new_action = dup_action(action, device)
      new_action.update_attributes(item.except(:id, :visuals))
      update_attached_files(new_action, item)
      new_action.id
    end

    def create_action(item, device)
      action = Action.new(item.except(:visuals))
      action.device = device
      action.save
      update_attached_files(action, item)
      action.id
    end

    def update_action(item)
      action = Action.find(item[:id])
      action.update_attributes(item.except(:visuals))
      update_attached_files(action, item)
      action.id
    end

    def remove_not_used_actions(device, order)
      Action.where(id: device.actions_order - order).each(&:destroy)
    end
  end
end
