# frozen_string_literal: true

class StepSerializer
  class << self
    include Comments::CommentLib

    def steps_as_json(steps)
      return [] if steps.blank?

      steps.map{ |step| step_as_json(step) }
    end

    def step_as_json(step)
      return {} if step.blank?

      step.as_json.merge!(
        {
          has_new_comments: new_comments_for_step(step.id),
          comments: CommentSerializer.comments_as_json(step.comments),
          visuals: AttachmentSerializer.files_as_json(step, step.default_media),
          procedure_device_ids: step.procedure&.device_ids || [],
          device: DeviceSerializer.device_as_json_by_id(step.device_id),
          images: AttachmentSerializer.test_file_as_json(step, 'image'),
          videos: AttachmentSerializer.test_file_as_json(step, 'video'),
        }
      )
    end
  end
end
