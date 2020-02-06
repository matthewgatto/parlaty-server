class DevicesController < ApplicationController
  before_action :require_login

=begin
Parameters: {"device"=>{"name"=>"New device 1", 
  "actions"=>[{"name"=>"new device 1 action 1", 
    "parameter_name"=>"parm1", 
    "parameter_value_8_pack"=>"parm1value", 
    "id"=>"6f6eafc5-ecd3-4cf6-97f1-9668c7b6c088", 
    "device_id"=>"d48c5440-f953-484f-a901-29694f88d0db"}]}}
=end

  # POST /devices
  def create
    @device = Device.new(device_params)
    if(@device.save)
      count = 0
      while params[:device][:actions] && count < params[:device][:actions].count
        actionParams = action_params(count)
        @action = Action.create!(name: actionParams[:name], device: @device,
          parameter_name: actionParams[:parameter_name],
          parameter_value_8_pack: actionParams[:parameter_value_8_pack])
        if (@action)
        else
          config.logger.error "action create failed in POST /devices"
          head :bad_request and return
        end
        count = count + 1
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
      count = 0
      while params[:device][:actions] && count < params[:device][:actions].count
        actionParams = action_params(count)

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
            parameter_value_8_pack: actionParams[:parameter_value_8_pack])
          if (@action)
          else
            config.logger.error "action create failed in PUT /devices/:id"
            head :bad_request and return
          end
        end
        count = count + 1
      end
      #render json: { "id": deviceId}, status: :ok and return
      render status: :ok
    else
      config.logger.error "device find failed in PUT /devices/:id"
      head :bad_request and return
    end


=begin 
    Parameters: {"device"=>{"id"=>"2", "name"=>"Part with Lock", 
    "actions"=>[{"id"=>"4", "device_id"=>"2", 
    "name"=>"Part Action One", "parameter_name"=>"parm1", 
    "parameter_value_8_pack"=>"parm1val"}, 
    {"id"=>"5", "device_id"=>"2", "name"=>"Part Action Two"}, 
    {"id"=>"6", "device_id"=>"2", "name"=>"Part Action Three"}]}}
=end

    #@step = Step.find(params[:id])
    #if(@st.update_attributes(procedure_params))
    # render json: @procedure, status: :ok
    #else
    #  head :bad_request
    #end
    
    #head: ok
    #render json: { "id": deviceId}, status: :ok
  end

  # DELETE /devices
  def destroy
    config.logger.debug "*** destroy "
	 	#@procedure = Procedure.find(params[:id])
	 	#if(@procedure.delete)
	 	#	head :ok
	 	#else
	 	#	head :bad_request
     #end
     
     #head :ok
     render json: { "id": 1}, status: :ok
    end

    private

=begin
Parameters: {"device"=>{"name"=>"New device 1", 
  "actions"=>[{"name"=>"new device 1 action 1", 
    "parameter_name"=>"parm1", 
    "parameter_value_8_pack"=>"parm1value", 
    "id"=>"6f6eafc5-ecd3-4cf6-97f1-9668c7b6c088", 
    "device_id"=>"d48c5440-f953-484f-a901-29694f88d0db"}]}}
=end

    def device_params
			params.require(:device).permit(:name)
    end
    
    def action_params(index)
			params[:device].require(:actions)[index].permit(:id, :device_id, :name, :parameter_name, :parameter_value_8_pack)
    end
    
end

