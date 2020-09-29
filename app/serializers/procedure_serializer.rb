# frozen_string_literal: true

class ProcedureSerializer
  class << self
    include Comments::CommentLib

    def procedures_as_json(procedures)
      { procedures: procedures.map{ |procedure| simple_procedure_as_json(procedure) } }
    end

    def procedure_as_json(procedure, steps, oem)
      simple_procedure_as_json(procedure).merge!({
        oem_businesses: OemBusinessSerializer.procedure_oem_businesses_as_json(procedure.oem_businesses),
        steps: StepSerializer.steps_as_json(steps),
        devices: DeviceSerializer.devices_as_json(procedure.devices),
        oem: oem ? OemSerializer.simple_oem_as_json(oem) : {},
      })
    end

    def created_procedure_as_json(id, oem)
      ApplicationSerializer.id_to_json(id).merge!(OemSerializer.oem_as_json(oem))
    end

    def simple_procedure_as_json(procedure)
      procedure.as_json.merge!({
        version: procedure.version || 1,
        procedure_id: procedure.id,
        has_new_comments: new_comments_for_procedure(procedure.id),
      })
    end
  end
end
