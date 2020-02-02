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
    config.logger.debug "*** update "
    #@step = Step.find(params[:id])
    #if(@st.update_attributes(procedure_params))
    # render json: @procedure, status: :ok
    #else
    #  head :bad_request
    #end
    
    #head: ok
    render json: { "id": 1}, status: :ok
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

