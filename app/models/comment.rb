class Comment < ApplicationRecord
  belongs_to :step
  belongs_to :author, foreign_key: :author_id, class_name: 'User'
end
