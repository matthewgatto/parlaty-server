# frozen_string_literal: true

class DeviceSerializer
  class << self
    def devices_as_json(devices)
      devices.map{ |device| simple_device_as_json(device) }
    end

    def simple_device_as_json(device)
      {
        id: device.id,
        name: device.name,
        default: device.default,
        procedure_id: device.procedure_id,
        actions_order: device.actions_order,
        actions: device_actions_as_json(device.actions)
      }
    end

    def device_as_json_by_id(device_id)
      return nil if device_id.blank?
      device = Device.find(device_id)
      DeviceSerializer.simple_device_as_json(device)
    end

    def device_actions_as_json(actions)
      actions.map do |action|
        {
          id: action.id,
          name: action.name,
          parameter_name: action.parameter_name,
          parameter_value_8_pack: action.parameter_value_8_pack,
          time: action.time,
          mode: action.mode
        }
      end
    end
  end
end
