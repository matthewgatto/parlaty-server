class Step < ApplicationRecord
	belongs_to 	:procedure, optional: true
	belongs_to :oem, optional: true # as saved_steps
	belongs_to :device, optional: true
	has_many_attached :visuals #image/video/pdf
end
