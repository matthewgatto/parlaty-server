# frozen_string_literal: true

class DeviceSerializer
  class << self
    def devices_as_json(devices)
      devices.map do |device|
        {
          id: device.id,
          name: device.name,
          default: device.default,
          procedure_id: device.procedure_id,
          actions_order: device.actions_order,
          actions: serialize_device_actions(device.actions)
        }
      end
    end

    def serialize_device_actions(actions)
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
