# frozen_string_literal: true

module Comments
  # CommentLib
  module CommentLib
    extend ActiveSupport::Concern

    included do
    end

    private

    def new_comments_for_step(step_id)
      comments = Comment.where(step_id: step_id, readed: false)
      comments.present?
    end

  end
end