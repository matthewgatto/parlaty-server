# frozen_string_literal: true

class UserSerializer
  class << self

    def update_user_as_json(user)
      {
        user_id: user.id,
        name: user.roleable.name,
        roleable_type: user.roleable_type,
        roleable_id: user.roleable_id,
        voice: user.voice,
        language: user.language,
        oem_businesses: serialize_oem_businesses(user),
        devices: serialize_devices
      }
    end

    def refresh_user_as_json(user)
      {
          jwt: '',
      }.merge!(update_user_as_json(user))
    end

    def user_as_json(user)
      {
          id: user.id,
          email: user.email,
          language: user.language,
          voice: user.voice
      }
    end
    def serialize_oem_businesses(user)
      oem_businesses = OemBusiness.all&.sort_by(&:name) if user.parlaty_admin?
      oem_businesses = user.roleable.oem.oem_businesses&.sort_by(&:name) if user.client_admin?
      oem_businesses = user.roleable.oem_businesses&.sort_by(&:name) if user.author? || user.operator?
      oem_businesses.map do |oem_business|
        {
          name: oem_business.name,
          oem_business_id: oem_business.id
        }
      end
    end

    def serialize_devices
      Device.all.sort_by(&:name).map do |device|
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
          parameter_value_8_pack: action.parameter_value_8_pack
        }
      end
    end

  end
end
