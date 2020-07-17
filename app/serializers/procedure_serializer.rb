# frozen_string_literal: true

class ProcedureSerializer
  class << self

    def procedures_as_json(procedures)
      { procedures: procedures.map{ |procedure| simple_procedure_as_json(procedure) } }
    end

    def procedure_as_json(procedure, steps)
      simple_procedure_as_json(procedure).merge!({
        procedure_id: procedure.id,
        oem_businesses: OemBusinessSerializer.procedure_oem_businesses_as_json(procedure.oem_businesses),
        version: procedure.version,
        category: procedure.category,
        steps_order: procedure.steps_order,
        steps: StepSerializer.steps_as_json(steps)
      })
    end

    def simple_procedure_as_json(procedure)
      {
        id: procedure.id,
        name: procedure.name,
        description: procedure.description,
        author: author_name(procedure.author),
        language: procedure.language,
        devices: DeviceSerializer.devices_as_json(procedure.devices)
      }
    end

    def author_name(author_id)
      begin
        User.find(author_id).roleable.name
      rescue
        nil
      end
    end

  end
end
