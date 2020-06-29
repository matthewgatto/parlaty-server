class ClientAdmin < ApplicationRecord
    has_one :user, as: :roleable
    belongs_to :oem, optional: false
end
