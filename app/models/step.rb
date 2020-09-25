class Step < ApplicationRecord
	belongs_to :procedure, optional: true
	belongs_to :oem, optional: true # as saved_steps
	belongs_to :device, optional: true
	belongs_to :associated_procedure, foreign_key: :associated_procedure_id, class_name: 'Procedure', optional: true
	has_many_attached :visuals, dependent: :destroy #image/video/pdf
end
