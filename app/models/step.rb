class Step < ApplicationRecord
	belongs_to 	:procedure, optional: true
	belongs_to :oem, optional: true # as saved_steps
	has_many_attached :visuals #image/video/pdf
end
