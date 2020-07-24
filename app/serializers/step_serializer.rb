# frozen_string_literal: true

class StepSerializer
  class << self
    def steps_as_json(steps)
      return [] if steps.blank?
      steps.map{ |step| step_as_json(step) }
    end

    def step_as_json(step)
      return [] if step.blank?
      {
        id: step.id,
        title: step.title,
        location: step.location,
        safety: step.safety,
        spoken: step.spoken,
        note: step.note,
        visuals: AttachmentSerializer.files_as_json(step),
        mode: step.mode,
        time: step.time,
        device: DeviceSerializer.device_as_json_by_id(step.device_id),
        device_id: step.device_id,
        has_visual: step.has_visual
      }
    end
  end
end
