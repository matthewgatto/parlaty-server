# frozen_string_literal: true

module Comments
  # CommentLib
  module CommentLib
    extend ActiveSupport::Concern

    included do
    end

    private

    def new_comments_for_oem_businesses(procedure_ids)
      comments = Comment.includes(:step).where('steps.procedure_id': procedure_ids, readed: false)
      comments.present?
    end

    def new_comments_for_procedure(procedure_id)
      comments = Comment.includes(:step).where('steps.procedure_id': procedure_id, readed: false)
      comments.present?
    end

    def new_comments_for_step(step_id)
      comments = Comment.where(step_id: step_id, readed: false)
      comments.present?
    end

  end
end