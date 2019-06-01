json.(@procedure, :id, :name, :version, :description, :category, :author, :language)

json.steps @sorted_steps do |sorted_step|
	json.(sorted_step, :id, :title, :device, :location, :note, :order, :procedure_id)
end
