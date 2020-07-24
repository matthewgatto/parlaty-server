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

    def oem_with_oem_businesses_as_json(oem, oem_businesses)
      simple_oem_as_json(oem).merge!({
        oem_businesses: OemBusinessSerializer.oem_businesses_as_json(oem_businesses)
      })
    end
  end
end
