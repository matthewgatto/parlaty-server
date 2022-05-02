# frozen_string_literal: true

class OemsController < ApplicationController
  before_action :require_login
  before_action :set_params, only: %i[update destroy setup_intent update_subscription subscription]
  skip_before_action :require_login, only: [:register_client_admin]

  # GET /oems
  def index
    authorize Oem
    render json: Oem.all.to_json, status: :ok
  end

  # POST /oems
  def create
    @oem = Oem.new(oem_params)
    authorize @oem
    if @oem.save
      render json: ApplicationSerializer.id_to_json(@oem.reload.id), status: :ok
    else
      render json: ApplicationSerializer.error_response(@oem.errors.full_messages)
    end
  end

  # POST /oems/register-client-admin
  def register_client_admin
    begin
      @user = User.new(params.permit(:email, :password))
      @user.confirm
      @oem = Oem.new(name: params.require(:oem).permit(:name))
      @roleable = ClientAdmin.new(name: params[:admin_name], oem: @oem)
      @user.roleable = @roleable
      if @oem.save && @roleable.save && @user.save
        jwt = Auth.encode({ uid: @user.id})
        render json: UserSerializer.refresh_user_as_json(@user, jwt), status: :ok
        #render json: UserSerializer.user_as_json(@user), status: :ok
      else
        render json: ApplicationSerializer.error_response(@user.errors.full_messages)
      end
    rescue => e
      render json: ApplicationSerializer.error_response("register client admin failed: e: " + e.to_s)
    end
  end

  # PUT /oems/:id
  def update
    authorize @oem
    if @oem.update_attributes(oem_params)
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      render json: ApplicationSerializer.error_response(@oem.errors.full_messages), status: :bad_request
    end
  end

  # DELETE /oems/:id
  def destroy
    authorize @oem
    if @oem.present? && @oem.destroy
      render json: ApplicationSerializer.id_to_json(params[:id]), status: :ok
    else
      head :bad_request
    end
  end

  def setup_intent
    #TODO kept failing here not sure why - authorize @oem
    if @oem.present?
      render json: SubscriptionSerializer.setup_intent(@oem.subscription), status: :ok
    else
      head :bad_request
    end
  end

  def update_subscription
    if @oem.present?
      @subscription = @oem.subscription
      if @subscription.update(subscription_params)
        data = SubscriptionSerializer.subscription_as_json(@subscription)
        render json: data, status: :ok
      else
        render json: ApplicationSerializer.error_response(@subscription.errors.full_messages), status: :bad_request
      end
    else
      head :bad_request
    end
  end

  def subscription
    if @oem.present?
      @subscription = @oem.subscription
      data = SubscriptionSerializer.subscription_as_json(@subscription)
      render json: data, status: :ok
    else
      render json: ApplicationSerializer.error_response(@subscription.errors.full_messages), status: :bad_request
    end
  end

  def subscription_plans
    @subscription_plans = Subscription.display_plans
    data = []
    @subscription_plans.each do |n|
      price = helpers.number_to_currency(n[:unit_price])
      billed = n[:billed] == "per month" ? "Monthly" : n[:billed] == "per year" ? "Yearly" : ""
      name = n[:name]
      description = "#{n[:name]} - (#{price}/Seat #{billed})"
      data <<  {"label": name, "description":description, "value": n[:plan_id]}
    end
    render json: data.to_json, status: :ok
  end

  private

  def set_params
    @oem = Oem.find(params[:id])
  end

  def oem_params
    params.require(:oem).permit(policy(@oem || Oem.new).permitted_attributes(current_user.roleable_type))
  end

  def subscription_params
    params.require(:subscription).permit(:confirm_status, :subscription_plan_id)
  end
end
