class DevicesController < ApplicationController
  before_action :require_login

  # GET /devices
  def index
    authorize Device
    render json: DeviceSerializer.devices_as_json(Device.all_devices), status: :ok
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
    deviceId = params[:id]
    @device = Device.find(deviceId)
    if (@device)
      @device.name = device_params[:name]
      @device.save
      count = 0
      @device.actions_order.clear
      action_map = Hash.new
      while params[:device][:actions] && count < params[:device][:actions].count
        actionParams = action_params(count)
        action_map[actionParams[:id]] = actionParams[:id]
        begin
          @action = Action.find(actionParams[:id])
          if (@action)
            if(@action.update_attributes(actionParams))
            else
              config.logger.error "action update attributes failed in PUT /devices/:id"
              head :bad_request and return
            end
          else
            config.logger.error "action find failed in PUT /devices/:id"
            head :bad_request and return
          end
        rescue ActiveRecord::RecordNotFound
          @action = Action.create!(name: actionParams[:name], device: @device,
            parameter_name: actionParams[:parameter_name],
            parameter_value_8_pack: actionParams[:parameter_value_8_pack],
            time: actionParams[:time], mode: actionParams[:mode])
          if (@action)
            action_map[@action.id] = @action.id
          else
            config.logger.error "action create failed in PUT /devices/:id"
            head :bad_request and return
          end
        end
        @device.actions_order.push(@action.id)
        count = count + 1
      end
      #render json: { "id": deviceId}, status: :ok and 
      # delete those actions that are no longer in params
      @device.actions.map do |action|
        tmp_id = action_map[action.id]
        if tmp_id.nil?
          @device.actions_order.pop(@action.id)
          action.destroy
        end
      end
      @device.save
      @device = Device.find(deviceId)
      render status: :ok
    else
      config.logger.error "device find failed in PUT /devices/:id"
      head :bad_request and return
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
        @device = Device.create(device_params)
        order = actions_params.map do |item|
          @action = Action.new(action_params(item))
          @action.device = @device
          @action.save
          @action.id
        end
        @device.actions_order = order
      end
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

