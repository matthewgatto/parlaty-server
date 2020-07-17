# frozen_string_literal: true

class AttachmentSerializer
  class << self
    include Rails.application.routes.url_helpers

    def file_as_json(step, type)
      return nil unless step.has_visual
      files = step.visuals.select{ |visual| visual.content_type.starts_with?("#{type}/") }
      files.map do |visual|
        {
          type.to_sym => rails_blob_url(visual, only_path: true),
          content_type: visual.content_type
        }
      end

    end

  end
end
