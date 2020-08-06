class OemBusinessesController < ApplicationController
	before_action :require_login
	include OemBusinesses::PermittedUsers

	# GET /oems/:id/oem_businesses
	def index
		authorize OemBusiness
		oem = Oem.find(params[:id])
		oem_businesses = oem.oem_businesses
		oem_businesses = oem_businesses.by_user(current_user) if current_user.author? || current_user.operator?
		render json: OemSerializer.oem_with_oem_businesses_as_json(oem, oem_businesses.sort_by(&:name)), status: :ok
	end

	# GET /oem_businesses/:id
	def show
		@oem_business = OemBusiness.find(params[:id])
		authorize @oem_business
		if permitted_user?(current_user, @oem_business)
			render json: OemBusinessSerializer.show_oem_business_as_json(@oem_business), status: :ok
		else
			render json: ApplicationSerializer.error_response(I18n.t("pundit.access_denied")), status: :forbidden
		end
	end

	# POST /oem_businesses
	def create
		@oem_business = OemBusiness.new(oem_business_params)
		authorize @oem_business
		if @oem_business.save
			render json: OemBusinessSerializer.create_oem_business_as_json(@oem_business), status: :ok
		else
			render json: ApplicationSerializer.error_response(@oem_business.errors.full_messages), status: :bad_request
		end
	end
	
	# DELETE /oem_businesses/:id
	def destroy
		@oem_business = OemBusiness.find(params[:id])
		(head :bad_request and return) if @oem_business.blank?
		authorize @oem_business
		if delete_oem_business(@oem_business)
			render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
		else
			head :bad_request
		end
	end
	
	private

	def oem_business_params
		params.require(:oem_business).permit(policy(@oem_business || OemBusiness.new).permitted_attributes)
	end

end
