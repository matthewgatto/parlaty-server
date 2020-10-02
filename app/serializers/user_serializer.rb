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
        user_id: user.id,
        email: user.email,
        language: user.language,
        voice: user.voice,
        name: user.roleable&.name,
        roleable_type: user.roleable_type,
      }
    end

    def user_as_json(user)
      simple_user_as_json(user).merge!(
        {
          oem: serialize_oem(user),
          oem_businesses: OemBusinessSerializer.user_oem_businesses_as_json(user)
        }
      )
    end

    def refresh_user_as_json(user, jwt)
      user_as_json(user).merge!(
        {
          jwt: jwt,
          roleable_id: user.roleable_id,
          devices: DeviceSerializer.devices_as_json(Device.all_devices.sort_by(&:name))
        }
      )
    end

    def serialize_oem(user)
      return {} if user.parlaty_admin?
      oem = user.roleable.oem if user.client_admin?
      oem = user.roleable.oem_businesses&.first&.oem if user.author? || user.operator?
      return {} if oem.blank?
      OemSerializer.simple_oem_as_json(oem)
    end

    def authors_as_json(authors)
      authors.compact.map do |author|
        {
          id: author.id,
          name: "#{author.roleable_type}: #{author.roleable.name} (#{author.email})"
        }
      end
    end
  end
end