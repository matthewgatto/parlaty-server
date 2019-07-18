class ParlatyAdmin < ApplicationRecord
	has_one :user, as: :roleable
end
