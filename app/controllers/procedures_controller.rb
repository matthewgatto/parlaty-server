class ProceduresController < ApplicationController
	include ActiveStorage::Downloading
	before_action :require_login
	include Procedures::ProcedureLib
	include Procedures::DuplicateProcedure
	include OemBusinesses::PermittedUsers
	before_action :set_params, only: %i[show update destroy reorder copy]

	# GET /oem_businesses/:id/procedures
	def index
		oem_business = OemBusiness.find(params[:id])
		authorize oem_business
		if permitted_user?(current_user, oem_business)
			render json: ProcedureSerializer.procedures_as_json((oem_business.procedures).sort_by &:name), status: :ok
		else
			render json: ApplicationSerializer.error_response(I18n.t("pundit.access_denied")), status: :forbidden
		end
	end

	# GET /procedures/all_procedures_for_user
	def all_procedures_for_user
		authorize Procedure
		procedures = procedures_list_by_role(current_user)
		render json: ProcedureSerializer.procedures_as_json((procedures).sort_by &:name), status: :ok
	end

	# GET /procedures/:id
	def show
		authorize @procedure
		@steps = Step.find(@procedure.steps_order) if @procedure.steps_order.present?
		render json: ProcedureSerializer.procedure_as_json(@procedure, @steps, procedure_oem_business&.oem), status: :ok
	end

	# POST /procedures
	def create
		(render json: ApplicationSerializer.error_response(I18n.t("errors.procedure.limited")) and return) if limited?

		@procedure = Procedure.new(procedure_params)
		authorize @procedure
		if @procedure.save
			render json: ProcedureSerializer.created_procedure_as_json(@procedure.id, @oem), status: :ok
		else
			render json: ApplicationSerializer.error_response(@procedure.errors.full_messages)
		end
	end

	# PUT /procedures/:id
	def update
		authorize @procedure
		if @procedure.update_attributes(procedure_params)
			render json: ApplicationSerializer.id_to_json(@procedure.id), status: :ok
		else
			render json: ApplicationSerializer.error_response(@procedure.errors.full_messages)
		end
	end

	# PUT /procedures/:id/reorder
	def reorder
		authorize @procedure
		so_arr = procedure_params[:steps_order].split(",").map(&:to_i)
		@procedure.steps_order = so_arr
		@procedure.save
		head :ok
	end

	# DELETE /procedures/:id
	def destroy
		authorize @procedure
		if @procedure.destroy
			render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
	 	else
	 		head :bad_request
		end
	end

	# PUT /procedures/:id/used
	def used
		# associated operator
		op = Operation.where(procedure_id: params[:id], operator_id: current_user.roleable_id).first
		op.last_used = Time.now
		op.save
		render json: {"Updated Time": op.last_used}, status: :ok
	end

	# POST /procedures/:id/copy
	def copy
		(render json: ApplicationSerializer.error_response(I18n.t("errors.procedure.limited")) and return) if limited?

		authorize @procedure
		new_procedure = procedure_dup(@procedure, procedure_params)
		if new_procedure.save
			render json: ProcedureSerializer.created_procedure_as_json(new_procedure.id, @oem), status: :ok
		else
			render json: ApplicationSerializer.error_response(new_procedure.errors.full_messages)
		end
	rescue => e
		render json: {error: [e.message, e.backtrace]}, status: :ok
	end

	private

		def set_params
			@procedure = Procedure.find(params[:id])
		end

		def procedure_params
			params.require(:procedure).permit(policy(@procedure || Procedure.new).permitted_attributes)
		end
end
