class Step < ApplicationRecord
	belongs_to 	:procedure, optional: false
	has_many_attached :visuals #image/video/pdf
end
