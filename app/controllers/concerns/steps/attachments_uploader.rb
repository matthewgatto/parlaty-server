# frozen_string_literal: true

module Steps
  # AttachmentsUploader
  module AttachmentsUploader
    extend ActiveSupport::Concern

    included do
      include Rails.application.routes.url_helpers
    end

    private

    def update_attached_files
      new_visuals_params = visuals_params[:visuals] || []
      string_visuals_params = new_visuals_params.select { |params| params.class == String }
      remove_not_used_visuals(string_visuals_params)
      (new_visuals_params - string_visuals_params).each do |visual_params|
        @step.visuals.attach(visual_params)
      end
      @step.has_visual = @step.visuals.attached?
      @step.save
    end

    def remove_not_used_visuals(visuals_params)
      return unless @step.visuals.attached?

      @step.visuals.purge and return if visuals_params.blank?

      @step.visuals.each do |visual|
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
