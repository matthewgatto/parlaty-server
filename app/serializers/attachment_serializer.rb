# frozen_string_literal: true

class AttachmentSerializer
  class << self
    include Rails.application.routes.url_helpers

    def files_as_json(step)
      return nil unless step.has_visual
      step.visuals.map do |visual|
        {
          visual: rails_blob_url(visual, only_path: true),
          type: visual.content_type
        }
      end

    end

  end
end
