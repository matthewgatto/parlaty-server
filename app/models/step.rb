class Step < ApplicationRecord
	# allows procedure_id to be null, since steps will be created first
	belongs_to 	:procedure, optional: true
end
