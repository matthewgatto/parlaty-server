# frozen_string_literal: true

require 'csv'
# StepsController
class StepsController < ApplicationController
  before_action :require_login
  include Devices::DeviceActions
  before_action :set_params, only: %i[update destroy]

  # POST /steps
  def create
    @step = Step.new(step_params)
    authorize @step
    @step.has_visual = visuals_params[:visuals].present? && visuals_params[:visuals].positive?
    if @step.save
      update_attached_files
      update_device_actions
      update_procedure_step_orders
      render json: StepSerializer.step_as_json(@step.reload), status: :ok
    else
      render json: ApplicationSerializer.error_response(@step.errors.messages)
    end
  end

  # PUT /steps/:id
  def update
    authorize @step
    if @step.update_attributes(step_params)
      update_attached_files
      update_device_actions
      render json: StepSerializer.step_as_json(@step.reload), status: :ok
    else
      render json: ApplicationSerializer.error_response(@step.errors.messages)
    end
  end

  # DELETE /steps/:id
  def destroy
    authorize @step
    @procedure = Procedure.find(@step.procedure_id)
    if @step.delete
      @procedure.steps_order.delete(params[:id])
      @procedure.save
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      head :bad_request
    end
  end

  # POST /csv_steps
  def csv_steps
    file = File.read(params[:csv_steps].path)
    @table = CSV.parse(file)
    @headers = @table.shift # remove first element of file to get the headers
  end

  private

  def update_procedure_step_orders
    @procedure = Procedure.find(@step.procedure_id)
    order = @procedure.steps_order.present? ? @procedure.steps_order : []
    order.push(@step.id)
    @procedure.steps_order = order
    @procedure.save
  end

  def update_attached_files
    @step.visuals.purge if @step.visuals.attached?
    @step.update_attributes(visuals_params)
  end

  def set_params
    @step = Step.find(params[:id])
  end

  def visuals_params
    params.require(:step).permit(policy(@step || Step.new).visuals_permitted_attributes)
  end

  def step_params
    params.require(:step).permit(policy(@step || Step.new).permitted_attributes)
  end

  def actions_params
    return [] if params.require(:step)[:actions].blank?

    params.require(:step).require(:actions)
  end

  def action_params(item)
    item.permit(policy(@step || Step.new).actions_permitted_attributes)
  end
end
