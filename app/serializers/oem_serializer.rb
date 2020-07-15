# frozen_string_literal: true

class OemSerializer
  class << self
    def oem_as_json(oem)
      {
        oem:
          {
            id: oem.id,
            name: oem.name
          }
      }
    end
  end
end
