class DevicesController < ApplicationController
  before_action :require_login

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

    def save_device_actions
      @device.transaction do
        order = actions_params.map do |item|
          new_params = action_params(item)
          new_params[:id].present? ? update_action(new_params) : create_action(new_params)
        end
        to_be_removed = @device.actions_order - order
        Action.find(to_be_removed).each(&:destroy)
        @device.actions_order = order
        @device.save
      end
    end

    def create_action(item)
      action = Action.new(item)
      action.device = @device
      action.save
      action.id
    end

    def update_action(item)
      action = Action.find(item[:id])
      action.update_attributes(item)
      action.id
    end

    def device_params
			params.require(:device).permit(policy(@device ||Device.new).permitted_attributes)
    end

    def actions_params
			params.require(:device).require(:actions)
    end

    def action_params(item)
      item.permit(policy(@device ||Device.new).actions_permitted_attributes)
    end
end

