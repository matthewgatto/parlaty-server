# frozen_string_literal: true

class OemSerializer
  class << self
    include Procedures::ProcedureLib

    def oem_as_json(oem)
      { oem: simple_oem_as_json(oem) }
    end

    def simple_oem_as_json(oem)
      oem.as_json.merge!({
        procedures_count: procedures_count(oem),
        procedures_names: procedures_names(oem),
        subscription: SubscriptionSerializer.simple_subscription_with_plans_as_json(oem.subscription)
      })
    end

    def oem_with_oem_businesses_as_json(oem, oem_businesses)
      simple_oem_as_json(oem).merge!({
        oem_businesses: OemBusinessSerializer.oem_businesses_as_json(oem_businesses)
      })
    end
  end
end
