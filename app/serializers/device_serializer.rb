# frozen_string_literal: true

class DeviceSerializer
  class << self
    def devices_with_name_as_json(devices)
      { devices: devices_as_json(devices) }
    end

    def devices_as_json(devices)
      devices.map do |device|
        simple_device_as_json(device)
      end
    end

    def device_as_json_by_id(device_id)
      return nil if device_id.blank?
      device = Device.find(device_id)
      simple_device_as_json(device)
    end

    def simple_device_as_json(device)
      device.as_json(methods: [:child_ids]).merge!(
        actions: device.actions.map{ |action|
          action.as_json.merge!(visuals: AttachmentSerializer.files_as_json(action, nil))
        }
      )
    end
  end
end