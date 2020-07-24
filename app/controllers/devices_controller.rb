class DevicesController < ApplicationController
  before_action :require_login
  include Devices::DeviceActions

  # GET /devices
  def index
    authorize Device
    render json: DeviceSerializer.devices_with_name_as_json(Device.all_devices), status: :ok
  end

  # POST /devices
  def create
    @device = Device.new(device_params)
    authorize @device
    save_device_actions
    if @device.save
      render json: DeviceSerializer.simple_device_as_json(@device)
    else
      render json: ApplicationSerializer.error_response(@device.errors.full_messages)
    end
  end

  # PUT /devices/:id
  def update
    @device = Device.find(params[:id])
    authorize @device
    if @device.update_attributes(device_params)
      save_device_actions
      @device.save
      head :ok
    else
      ApplicationSerializer.error_response(@device.errors.full_messages)
    end
  end

  # DELETE /devices
  def destroy
    @device = Device.find(params[:id])
    authorize @device
    if @device.destroy
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      head :bad_request
    end
  end

  private

    def device_params
			params.require(:device).permit(policy(@device ||Device.new).permitted_attributes)
    end

    def actions_params
      return [] if params.require(:device)[:actions].blank?
			params.require(:device).require(:actions)
    end

    def action_params(item)
      item.permit(policy(@device ||Device.new).actions_permitted_attributes)
    end
end

