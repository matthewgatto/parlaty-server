# coding: utf-8
module Users
  module Role
    ADMIN_ROLE = 'parlaty_admin'.freeze
    CLIENT_ADMIN_ROLE = 'client_admin'.freeze
    AUTHOR_ROLE = 'author'.freeze
    OPERATOR_ROLE = 'operator'.freeze
    ROLES = [ADMIN_ROLE, CLIENT_ADMIN_ROLE, AUTHOR_ROLE, OPERATOR_ROLE].freeze
  end
end