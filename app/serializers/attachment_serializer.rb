# frozen_string_literal: true

class AttachmentSerializer
  class << self
    include Rails.application.routes.url_helpers

    def files_as_json(obj)
      return nil unless obj.visuals.attached?
      obj.visuals.map do |visual|
        {
          id: visual.id,
          visual: rails_blob_url(visual, only_path: true),
          type: visual.content_type
        }
      end

    end

  end
end
