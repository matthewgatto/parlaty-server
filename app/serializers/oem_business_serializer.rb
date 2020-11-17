# frozen_string_literal: true

class OemBusinessSerializer
  class << self
    include OemBusinesses::PermittedUsers
    include Comments::CommentLib

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
      ).merge!(
        authors: UserSerializer.authors_as_json(authors_list(oem_business))
      )
    end

    def procedure_oem_businesses_as_json(oem_businesses)
      oem_businesses.map{ |oem_business| show_oem_business_as_json(oem_business) }
    end

    def simple_oem_business_as_json(oem_business)
      {
        oem_business_id: oem_business.id,
        id: oem_business.id,
        name: oem_business.name,
        oem_id: oem_business.oem_id,
        has_new_comments: new_comments_for_oem_businesses(oem_business.procedure_ids),
      }
    end

  end
end
