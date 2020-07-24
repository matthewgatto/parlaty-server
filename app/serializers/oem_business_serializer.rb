# frozen_string_literal: true

class OemBusinessSerializer
  class << self
    def user_oem_businesses_as_json(user)
      oem_businesses = OemBusiness.all&.sort_by(&:name) if user.parlaty_admin?
      oem_businesses = user.roleable.oem.oem_businesses&.sort_by(&:name) if user.client_admin?
      oem_businesses = user.roleable.oem_businesses&.sort_by(&:name) if user.author? || user.operator?
      return [] if oem_businesses.blank?
      oem_businesses.map{ |oem_business| simple_oem_business_as_json(oem_business) }
    end

    def oem_businesses_as_json(oem_businesses)
      oem_businesses.map{ |oem_business| simple_oem_business_as_json(oem_business) }
    end

    def create_oem_business_as_json(oem_business)
      { oem_business: simple_oem_business_as_json(oem_business) }
    end

    def show_oem_business_as_json(oem_business)
      simple_oem_business_as_json(oem_business).merge!(
        ProcedureSerializer.procedures_as_json(oem_business.procedures)
      )
    end

    def procedure_oem_businesses_as_json(oem_businesses)
      oem_businesses.map{ |oem_business| { oem_business_id: oem_business.id } }
    end

    def simple_oem_business_as_json(oem_business)
      {
        oem_business_id: oem_business.id,
        id: oem_business.id,
        name: oem_business.name,
        oem_id: oem_business.oem_id
      }
    end

  end
end
