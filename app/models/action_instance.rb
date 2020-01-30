class ActionInstance < ApplicationRecord
  belongs_to :step
  belongs_to :action
end
