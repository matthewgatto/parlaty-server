# frozen_string_literal: true

class CommentSerializer
  class << self
    def comments_as_json(comments)
      return [] if comments.blank?

      comments.map{ |comment| comment_as_json(comment) }
    end

    def comment_as_json(comment)
      return {} if comment.blank?

      comment.as_json.merge!({
        author: comment.author.roleable.name
      })
    end
  end
end
