class OemSerializer
  class << self

    def oem_as_json(oem)
      {
        "oem":
          {
            "id": oem.id,
            "name": oem.name
          }
      }
    end
    
    def as_json(oem)
      oem.as_json
    end
  end
end
