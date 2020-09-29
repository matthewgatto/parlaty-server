# frozen_string_literal: true

class CommentSerializer
  class << self
    include Comments::CommentLib

    def comments_as_json(comments)
      return [] if comments.blank?

      comments.map{ |comment| comment_as_json(comment) }
    end

    def readed_comment_to_json(comment)
      {
        readed: true,
        has_new_comments: new_comments_for_step(comment.step_id),
      }
    end

    def comment_as_json(comment)
      return {} if comment.blank?

      comment.as_json.merge!({
        created_at: comment.created_at.strftime("%m/%d/%Y %H:%M"),
        author: comment.author.roleable.name
      })
    end
  end
end
