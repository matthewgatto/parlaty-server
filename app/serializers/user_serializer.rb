# frozen_string_literal: true

class UserSerializer
  class << self
    def users_as_json(user)
      users = User.all if user.parlaty_admin?
      if user.client_admin?
        # todo rewrite algorithm
        oem = user.roleable.oem
        tmp_users = Array.new
        oem.client_admins.map do |ca|
          tmp_users << ca.user
        end
        oem.oem_businesses.map do |ob|
          ob.operators.map do |o|
            tmp_users << o.user
          end
          ob.authors.map do |a|
            tmp_users << a.user
          end
        end
        users = tmp_users.uniq.compact.sort_by &:email
        #// todo
      end
      return [] if users.blank?
      {
        users: users.map{ |u| simple_user_as_json(u) }
      }
    end

    def simple_user_as_json(user)
      {
          id: user.id,
          email: user.email,
          language: user.language,
          voice: user.voice,
          roleable_type: user.roleable_type,
      }
    end

    def user_as_json(user)
      simple_user_as_json(user).merge!(
        {
          oem: serialize_oem(user),
          oem_businesses: serialize_oem_businesses(user)
        }
      )
    end

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

    def refresh_user_as_json(user, jwt)
      {
        jwt: jwt,
      }.merge!(update_user_as_json(user))
    end

    def serialize_oem(user)
      return {} if user.parlaty_admin?
      oem = user.roleable.oem if user.client_admin?
      oem = user.roleable.oem_businesses&.first&.oem if user.author? || user.operator?
      return {} if oem.blank?
      {
        id: oem.id,
        name: oem.name
      }
    end

    def serialize_oem_businesses(user)
      oem_businesses = OemBusiness.all&.sort_by(&:name) if user.parlaty_admin?
      oem_businesses = user.roleable.oem.oem_businesses&.sort_by(&:name) if user.client_admin?
      oem_businesses = user.roleable.oem_businesses&.sort_by(&:name) if user.author? || user.operator?
      oem_businesses.map do |oem_business|
        {
          name: oem_business.name,
          oem_business_id: oem_business.id,
          oem_id: oem_business.oem_id
        }
      end if oem_businesses
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
