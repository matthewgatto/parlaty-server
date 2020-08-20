# frozen_string_literal: true

module Procedures
	# ProcedureCountLimit
	module DuplicateProcedure
		extend ActiveSupport::Concern

		included do
		end

		private

		def procedure_dup(procedure, params)
			new_procedure = procedure.dup
			params.to_unsafe_h.map{ |key, value| new_procedure[key] = value }
			new_procedure.operations = operations_dup(procedure.operations) if procedure.operations.present?
			devices_result = devices_dup(procedure.devices)
			new_procedure.devices = devices_result[:devices] if procedure.devices.present?
			steps_result = steps_dup(procedure.steps, devices_result[:devices_map])
			new_procedure.steps = steps_result[:steps]  if procedure.steps.present?
			new_procedure.steps_order = steps_result.present? ?
																			procedure.steps_order.map{ |item| steps_result[:steps_map][item] } : []
			new_procedure.oem_businesses = procedure.oem_businesses
			new_procedure
		end

		def operations_dup(operations)
			return [] if operations.blank?

			operations.map{ |operation| operation.dup }
		end

		def devices_dup(devices)
			return {} if devices.blank?

			result = {}
			devices_map = {}
			result[:devices] = devices.map do |device|
				new_device = device_dup(device)
				devices_map[device.id] = new_device.id if new_device
				new_device
			end
			result[:devices_map] = devices_map
			result
		end

		def device_dup(device)
			new_device = device.dup
			actions_result = actions_dup(device.actions)
			new_device.actions = actions_result[:actions] if actions_result.present?
			new_device.actions_order = actions_result.present? ?
				  device.actions_order.map{ |item| actions_result[:actions_map][item] } : []
			new_device.save
			new_device
		end

		def actions_dup(actions)
			return {} if actions.blank?

			result = {}
			actions_map = {}
			result[:actions] = actions.map do |action|
				new_action = action.dup
				new_action.save
				actions_map[action.id] = new_action.id
				new_action
			end
			result[:actions_map] = actions_map
			result
		end

		def steps_dup(steps, devices_map)
			return {} if steps.blank?

			result = {}
			steps_map = {}
			result[:steps] = steps.map do |step|
				new_step = step.dup
				new_step.device_id = devices_map[step.device_id]
				step_visuals_dup(step.visuals).each { |visual| new_step.visuals.attach(visual)} if step.visuals.present?
				new_step.save
				steps_map[step.id] = new_step.id
				new_step
			end
			result[:steps_map] = steps_map
			result
		end

		def step_visuals_dup(visuals)
			return [] if visuals.blank?

			visuals.map{ |visual| file_dup(visual) }
		end

		def file_dup(visual)
			result = {}
			result[:content_type] = visual.blob.content_type
			result[:filename] = visual.filename
			file = Tempfile.new('parlaty-attachment-copy-tmp')
			path = file.path
			file.close
			file = File.open(path, 'wb')
			binary = visual.download
			file.write(binary)
			file.close
			result[:io] = File.open(path, 'r')
			result
		end
	end
end