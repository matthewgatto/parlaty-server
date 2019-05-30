class ParlatyAdminsController < ApplicationController
	def show
	@parlaty_admin = ParlatyAdmin.find(params[:id])
	render json: @parlaty_admin
end

def create
	@parlaty_admin = ParlatyAdmin.new(parlaty_admin_params)

	if(@parlaty_admin.save)
		render json: @parlaty_admin, status: :created
	else
		head :bad_request
	end

end

def update
	@parlaty_admin = ParlatyAdmin.find(params[:id])
	if(@parlaty_admin.update_attributes(parlaty_admin_params))
		render json: @parlaty_admin, status: :ok
	else
		head :bad_request
	end
end

def destroy
	@parlaty_admin = ParlatyAdmin.find(params[:id])
	if(@parlaty_admin.delete)
		head :ok
	else
		head :bad_request
	end
end

private

	def parlaty_admin_params
		params.require(:parlaty_admin).permit(:email, :password, :password_confirmation)
	end

end
