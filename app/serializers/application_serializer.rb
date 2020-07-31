# frozen_string_literal: true

class ApplicationSerializer
  class << self
    def id_to_json(id)
      { id: id }
    end

    def error_response(message)
      { error: message }
    end
  end
end
