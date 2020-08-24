# frozen_string_literal: true

class OemsController < ApplicationController
  before_action :require_login
  before_action :set_params, only: %i[update destroy]

  # GET /oems
  def index
    authorize Oem
    render json: Oem.all.to_json, status: :ok
  end

  # POST /oems
  def create
    @oem = Oem.new(oem_params)
    authorize @oem
    if @oem.save
      render json: ApplicationSerializer.id_to_json(@oem.reload.id), status: :ok
    else
      render json: ApplicationSerializer.error_response(@oem.errors.full_messages)
    end
  end

  # PUT /oems/:id
  def update
    authorize @oem
    if @oem.update_attributes(oem_params)
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      render json: ApplicationSerializer.error_response(@oem.errors.full_messages), status: :bad_request
    end
  end

  # DELETE /oems/:id
  def destroy
    authorize @oem
    if @oem.present? && @oem.destroy
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      head :bad_request
    end
  end

  private

  def set_params
    @oem = Oem.find(params[:id])
  end

  def oem_params
    params.require(:oem).permit(policy(@oem || Oem.new).permitted_attributes(current_user.roleable_type))
  end
end
