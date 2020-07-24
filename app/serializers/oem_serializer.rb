# frozen_string_literal: true

class OemSerializer
  class << self
    def oem_as_json(oem)
      { oem: simple_oem_as_json(oem) }
    end

    def simple_oem_as_json(oem)
      {
        id: oem.id,
        name: oem.name
      }
    end
  end
end
