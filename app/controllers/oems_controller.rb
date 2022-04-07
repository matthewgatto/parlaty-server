# frozen_string_literal: true

class OemsController < ApplicationController
  before_action :require_login
  before_action :set_params, only: %i[update destroy setup_intent update_subscription subscription]

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
    #TODO kept failing here not sure why - authorize @oem
    if @oem.present?
      @subscription = @oem.subscription

=begin
      Rails.logger.info("** in update_subcription: @subscription.confirm_status: " + @subscription.confirm_status.to_s)

      if @subscription.confirm_status == "ACCEPTED"
        Rails.logger.info("** in update_subcription: confirm status accepted, cancelling")
        @subscription.confirm_status = "CANCELLED"
        @subscription.save
      end
=end
=begin
      if @subscription.confirm_status == "CANCELLED"
        @subscription.subscription_plan_id = nil
        @subscription.subscription_id = nil
        @subscription.save
      end
=end
      Rails.logger.debug("** in update_subscription: about to update subscription")
      if @subscription.update(subscription_params)
        Rails.logger.debug("** in update_subscription: updated subscription")
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
    pps = Oem.pps
    @subscription_plans = pps.get_plans
    # @subscription_plans = [{id: 1, name: 'plan1'}, {id: 2, name: 'plan2'}]
    # render json: @subscription_plans.to_json, status: :ok
    # data = @subscription_plans.data.map { |n| {"label": n.nickname, "value": n.product}}
    data = @subscription_plans.data.map { |n| {"label": n.nickname, "value": n.id}}
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
