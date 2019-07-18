class Operation < ApplicationRecord
	belongs_to :operator
  belongs_to :procedure
end
