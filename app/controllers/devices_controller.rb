class DevicesController < ApplicationController
  before_action :require_login

  # POST /devices
  def create
    @device = Device.new(device_params)
    if @device.procedure_id
      procedure = Procedure.find(@device.procedure_id)
      #@device.oem_business_id = procedure.oem_business_id
    end
    #if !@device.oem_business_id
    #  config.logger.error "action create failed in POST /devices: missing oem_business_id"
    #  head :bad_request and return
    #end
    if(@device.save)
      count = 0
      while params[:device][:actions] && count < params[:device][:actions].count
        actionParams = action_params(count)
        @action = Action.create!(name: actionParams[:name], device: @device,
          parameter_name: actionParams[:parameter_name],
          parameter_value_8_pack: actionParams[:parameter_value_8_pack],
          time: actionParams[:time], mode: actionParams[:mode])
        if (@action)
        else
          config.logger.error "action create failed in POST /devices"
          head :bad_request and return
        end
        @device.actions_order.push(@action.id)
        count = count + 1
      end
      if count > 1
        @device.save
      end
			#render json: { "id": @device.id}, status: :ok and return
      render status: :created
    else
      config.logger.error "device save 2 failed in POST /devices"
			render json: { "error": @device.errors.full_messages }, status: :bad_request and return
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
    #begin
	 	  if (@device.destroy)
        render json: { "id": params[:id]}, status: :ok
      else
	 	    head :bad_request
      end
    #rescue
    #  config.logger.error "destroy of device id: " + params[:id].to_s + " failed."
    #  head :bad_request
    #end
  end
  
  # GET /devices
  def devices_index
    @devices = Device.all()
    render status: :ok
  end

  private

    def device_params
			params.require(:device).permit(:name, :procedure_id)
    end
    
    def action_params(index)
			params[:device].require(:actions)[index].permit(:id, :device_id, :name, :parameter_name, :parameter_value_8_pack, :time, :mode)
    end
    
end

