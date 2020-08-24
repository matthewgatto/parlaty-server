# frozen_string_literal: true

module Attachments
  # Uploader
  module Uploader
    extend ActiveSupport::Concern

    included do
      include Rails.application.routes.url_helpers
    end

    private

    def update_attached_files(obj, visuals_params)
      new_visuals_params = visuals_params[:visuals] || []
      string_visuals_params = new_visuals_params.select { |params| params.class == String }
      remove_not_used_visuals(string_visuals_params, obj)
      (new_visuals_params - string_visuals_params).each do |visual_params|
        obj.visuals.attach(visual_params)
      end
      obj.has_visual = obj.visuals.attached? if obj.respond_to?(:has_visual)
      obj.save
    end

    def remove_not_used_visuals(visuals_params, obj)
      return unless obj.visuals.attached?

      obj.visuals.purge and return if visuals_params.blank?

      obj.visuals.each do |visual|
        visual_url = rails_blob_url(visual, only_path: true)
        remove_not_used_visual(visual) unless visuals_params.include? visual_url
      end
    end

    def remove_not_used_visual(visual)
      visual.destroy
      visual.blob.destroy
    end
  end
end
