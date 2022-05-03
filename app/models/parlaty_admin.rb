class ParlatyAdmin < ApplicationRecord
	has_one :user, as: :roleable
  
  def oem
    nil
  end

end
