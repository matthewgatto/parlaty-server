# frozen_string_literal: true

class OemsController < ApplicationController
  before_action :require_login

  # GET /oems
  def index
    authorize Oem
    render json: Oem.all.to_json, status: :ok
  end

  # POST /oems
  def create
    authorize Oem
    @oem = Oem.create!(oem_params)
    render json: OemSerializer.oem_as_json(oem), status: :ok
  end

  # PUT /oems/:id
  def update
    @oem = Oem.find(params[:id])
    authorize @oem
    if @oem.update_attributes(oem_params)
      head :ok
    else
      render json: { "error": @oem.errors.full_messages }, status: :bad_request
    end
  end

  # DELETE /oems/:id
  def destroy
    @oem = Oem.find(params[:id])
    authorize @oem
    if @oem.present? && delete_oem(@oem)
      render json: OemSerializer.delete_response(params[:id]), status: :ok
    else
      head :bad_request
    end
  end

  private

  def oem_params
    params.require(:oem).permit(policy(@oem).permitted_attributes)
  end
end
