# frozen_string_literal: true

class ApplicationSerializer
  class << self
    def delete_response(id)
      {
        id: id
      }
    end

    def error_response(message)
      {
        error: message
      }
    end
  end
end
