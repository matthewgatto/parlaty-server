class DevicesController < ApplicationController
  before_action :require_login

  # POST /devices
  def create
    config.logger.debug "*** create "
    #if(@procedure.save)
			#head :ok
		#	render json: { "id": @procedure.id}, status: :ok
		#else
		#	render json: { "error": @procedure.errors.full_messages }, status: :bad_request
    #end
    
    #head: ok
    render json: { "id": 1}, status: :ok
  end

  # PUT /devices
  def update
    deviceId = params[:device][:id]
    config.logger.debug "*** update: deviceId: " + deviceId.to_s
    @device = Device.find(deviceId)
    if (@device)
      config.logger.debug "*** update found device: "

      render json: { "id": deviceId}, status: :ok
    else
      config.logger.debug "*** device not found"
      head :bad_request
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
end

