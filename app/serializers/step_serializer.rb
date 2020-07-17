# frozen_string_literal: true

class StepSerializer
  class << self
    def steps_as_json(steps)
      return [] if steps.blank?
      steps.map do |step|
        {
            id: step.id,
            title: step.title,
            location: step.location,
            safety: step.safety,
            spoken: step.spoken,
            note: step.note,
            images: AttachmentSerializer.file_as_json(step, 'image'),
            videos: AttachmentSerializer.file_as_json(step, 'video'),
            mode: step.mode,
            time: step.time,
            device: DeviceSerializer.device_as_json_by_id(step.device_id)
        }
      end
    end

  end
end
