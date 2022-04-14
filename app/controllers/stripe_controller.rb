class StripeController < ApplicationController
  before_action :validate_stripe_webhook

  def subscription_update
    sub_updated = false
    event_name = "No Event"
    if @event.present?     
      event_name = @event.type
      pps = Oem.pps
      @object_type = @event.data.object.object
      @object = @event.data.object
      if @object_type == "subscription"
        @subscription = @object
      elsif @object_type == "invoice"
        @subscription = pps.get_subscription(@object.subscription)
        if @subscription.present? && @subscription[:errors].present?
          @subscription = nil
        end
      end
      if @subscription.present? && @subscription.metadata.present?
        @metadata = @subscription.metadata
        if @metadata["oem_subscription_id"].present?
          @sub = Subscription.find_by_id(@metadata.oem_subscription_id)
          @check_client = false
          if @sub.present?
            @check_client = @metadata.oem_id.to_i == @sub.oem_id
          end 
        end
        if @sub.present?
          if !@check_client
            @errors << "Client/Subscription mismatch"
          else
            vals = {payment_status: @subscription.status.upcase}
            if event_name == "invoice.payment_failed"
              vals[:failed_invoice] = @object.id
            elsif event_name == "invoice.payment_succeeded"
              vals[:failed_invoice] = nil
            end
            @sub.with_lock do
              @sub.payment_status = @subscription.status.upcase
              sub_updated = @sub.save
            end           
          end
        else
          @errors << "Subscription not found"
        end
      else
        @errors << "No Subscription object found"
      end
    else
      @errors << "No event found"
    end
    if !@errors.any?
      resp_status = :ok
    else
      resp_status = :unprocessable_entity
    end
    render json: {event: event_name, subscription_updated: sub_updated, errors: @errors}, status: resp_status 
  end

  def payment_method_update
    card_arr = ["customer.card.updated","customer.card.deleted","customer.card.created", "payment_method.attached","customer.source.updated","customer.source.deleted","customer.source.created"]
    seti_arr = ["setup_intent.succeeded"]
    pm_arr = ["payment_method.detached"]
    joined_arr = card_arr + seti_arr + pm_arr
    @updated = false
    if @event.present?
      if card_arr.include?(@event.type)
        @card = @event.data.object
        @card_id = @card.id
        if @card.customer.present?
          @client = Oem.find_by_customer_id(@card.customer)
        else
          @errors << "Customer not found"
        end
      elsif seti_arr.include?(@event.type)
        @card_id = @event.data.object.payment_method
        if @event.data.object.customer.present?
          @client = Oem.find_by_customer_id(@event.data.object.customer)
        end
      elsif pm_arr.include?(@event.type)
        @card = @event.data.object
        @card_id = @card.id
        if @event.data.previous_attributes.customer.present?
          @client = Oem.find_by_customer_id(@event.data.previous_attributes.customer)
        end
      end
      if @client.present?
        case(@event.type)
          when "customer.card.created", "customer.card.updated", "payment_method.attached","customer.source.created", "customer.source.updated"
            if @client.source_id != @card_id
              @updated = @client.update(source_id: @card_id)
            end
          when "customer.card.deleted", "payment_method.detached", "customer.source.deleted"
            if @client.source_id == @card_id
              @updated = @client.update(source_id: nil)
              @client.set_payment_method
            end
        end
      else
        @errors << "No Customer"
      end
      if !joined_arr.include?(@event.type)
        @errors << "Not card arr: #{@event.type}"
      end
    else
      @errors << "No Event"
    end
    if !@errors.any?
      resp_status = :ok
    else
      resp_status = :unprocessable_entity
    end
    render json: {event_type: @event.type, updated: @updated, errors:@errors}, status: resp_status
  end

  def validate_stripe_webhook
    @errors = []
    payload = request.body.read    
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    secret = EndpointKey.by_endpoint(controller_name, action_name)
    if secret.present? && sig_header.present?
      event = secret.validate_webhook(payload, sig_header)
      if secret.good_response?(event)
        @event = event
      end
    elsif !secret.present?
      @errors << "No Key Set"
    elsif !sig_header.present?
      @errors << "No Header Sent"
    end
  end

end