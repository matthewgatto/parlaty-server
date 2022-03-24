require 'stripe'

class PaymentProcessingService
  include ActiveSupport::Rescuable

    rescue_from Stripe::CardError, with: :handle_error

    rescue_from Stripe::RateLimitError do |e|
      return_error(e.error.message)
      # Too many requests made to the API too quickly
    end

    rescue_from Stripe::InvalidRequestError, with: :handle_error


    rescue_from Stripe::AuthenticationError do |e|
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
      puts e.error.message
      return_error(e.error.message)
    end

    rescue_from Stripe::APIConnectionError do |e|
      # Network communication with Stripe failed
      puts e.error.message
      return_error(e.error.message)
    end

    rescue_from Stripe::StripeError do |e|
      # Display a very generic error to the us
      return_error(e.error.message)
    end

## METHOD CALLS

#CUSTOMER

  def create_oem_customer(oem)
    return {"id": SecureRandom.hex(10)} if Rails.env.test?
    if oem.customer_id.present?
      self.get_customer(oem.customer_id)
    else
      hash = {
        name: oem.name,
        metadata: { oem_id: oem.id}
      }
      customer_create(hash)
    end
  end

  def update_default_card(customer_id, source_id)
    hash = {
      source: source_id
    }
    update_customer(customer_id, hash)
  end

  def update_customer(customer_id, hash)
    customer_update(customer_id, hash)
  end

  # get a customer object
  def get_customer(customer_id)
    customer_find(customer_id)
  end

  def find_customer_by_name(name)
    list = customer_find_by_name(name)
    if list.present? && good_response?(list)
      list.first
    else
      nil
    end
  end

#SETUP INTENT - PAYMENT METHOD

  def get_setup_intent(seti_id)
    setup_intent_find(seti_id)
  end

  def create_setup_intent(customer_id)
    setup_intent_create(customer_id)
  end


  # get a card object
  def get_card(customer_id, source_id)
    resp = payment_method_find(source_id)
    if resp.present? && good_response?(resp) && resp.customer == customer_id
      resp
    else
      nil
    end
  end

  def remove_payment_method(source_id)
    resp = payment_method_remove(source_id)
    if resp.present? && good_response?(resp)
      resp
    else
      nil
    end
  end


#SUBSCRIPTION

  def get_plans
    return [] if Rails.env.test?
    plans_list
  end

  def get_prices
    return [] if Rails.env.test?
    prices_list
  end

  def get_plan(plan_id)
    plan_find(plan_id)
  end

  def get_price(price_id)
    price_find(price_id)
  end

  def create_subscription(hash)
    subscription_create(hash)
  end

  def update_subscription(id, hash)
    subscription_update(id, hash)
  end

  def get_subscription(id)
    subscription_get(id)
  end

  def cancel_subscription(id)
    subscription_cancel(id)
  end

  def create_invoice(hash)
    invoice_create(hash)
  end

  def get_invoice(id)
    invoice_get(id)
  end

  def pay_invoice(id)
    invoice_pay(id)
  end

  def get_coupons
    return [] if Rails.env.test?
    coupon_list
  end

  def get_coupon(id)
    coupon_find(id)
  end

  def get_promocodes
    return [] if Rails.env.test?
    promocode_list
  end

  def active_promocodes
    codes = self.get_promocodes
    return codes unless codes.present? && codes.data.present?
    codes.data.find_all{|x| x.active }.map(&:code)
  end

#PAYMENT INTENT - CHARGES

  def make_direct_charge(customer_id, source_id, amount, desc)
    hash = {
      amount: amount, 
      description: desc, 
      customer_id: customer_id, 
      payment_method: source_id, 
      currency: "usd",
      payment_method_types: ["card"]
    } 
    charge_create(hash)
  end

  def make_pay_intent(hash)
    pay_intent_create(hash)
  end

  def get_pay_intent(intent_id)
    pay_intent_find(intent_id)
  end

  def delete_pay_intent(intent_id)
    pay_intent_delete(intent_id)
  end

  def make_direct_refund(charge_id, amount)
    hash = {
      charge: charge_id,
      amount: amount
    }
    refund_create(hash)
  end

  def list_charges(customer_id=nil)
    options = {limit: 20}
    if customer_id.present?
      options[:customer] = customer_id
    end
    charge_list(options)
  end

#AUTH CODES

  def validate_auth(code)
    hash = {
      grant_type: "authorization_code",
      code: code
    }
    auth_validate(hash)
  end

#ACCOUNT - MERCHANT
  
  def get_account(acc_id)
    account_find(acc_id)
  end


  def set_merchant(submerchant)
    acc = get_account(submerchant.merchant_id)
    acc
  end

  def validate_webhook(payload, sig_header, end_secret)
    webhook_check(payload, sig_header, end_secret)
  end

  def get_merchant_login_link(merchant_id)
    login_link_merchant(merchant_id)
  end

## ACTUAL API CALLS

  def customer_create(hash)    
    call_with_rescue { customer_service.create(hash) }
  end

  def customer_update(id, hash)
    call_with_rescue { customer_service.update(id, hash) }
  end

  def customer_find(id)
    call_with_rescue { customer_service.retrieve(id) }
  end

  def customer_find_by_name(name)
    call_with_rescue { customer_service.list({email: name}) }
  end

  def payment_method_create(hash)
    call_with_rescue { payment_method_service.create(hash) }
  end

  def payment_method_find(id)
    call_with_rescue { payment_method_service.retrieve(id) }
  end

  def payment_method_list(customer_id)
    call_with_rescue { payment_method_service.list({customer: customer_id, type:'card'}) }
  end

  def payment_method_remove(source_id)
    call_with_rescue { payment_method_service.detach(source_id) }
  end

  def setup_intent_create(customer_id)
    call_with_rescue { setup_intent_service.create({customer: customer_id}) }
  end
 
  def setup_intent_find(seti_id)
    call_with_rescue { setup_intent_service.retrieve(seti_id) }
  end

  def pay_intent_create(hash)
    call_with_rescue { pay_intent_service.create(hash) }
  end

  def pay_intent_find(intent_id)
    call_with_rescue { pay_intent_service.retrieve(intent_id) }
  end

  def pay_intent_delete(intent_id)
    call_with_rescue { pay_intent_service.delete(intent_id) }
  end

  def refund_create(hash)
    call_with_rescue { refund_service.create(hash) }
  end

  def auth_validate(hash)
    call_with_rescue { oauth_service.token(hash) }
  end

  def account_find(account_id)
    call_with_rescue { account_service.retrieve(account_id) }
  end

  def account_list
    call_with_rescue { account_service.list() }
  end

  def charge_list(options)
    call_with_rescue { charge_service.list(options) }
  end

  def login_link_merchant(merch_id)
    account_service.create_login_link(merch_id)
  end

  def webhook_check(payload, sig_header, end_secret)
    call_with_rescue { webhook_service.construct_event(payload, sig_header, end_secret) }
  end

  def plans_list
    call_with_rescue { plan_service.list({limit: 100}) }
  end

  def plan_find(plan_id)
    call_with_rescue { plan_service.retrieve(plan_id) }
  end

  def prices_list
    call_with_rescue { price_service.list({expand:['data.tiers'], limit:100}) }
  end

  def price_find(price_id)
    call_with_rescue { price_service.retrieve({id: price_id, expand:['tiers']}) }
  end


  def subscription_create(hash)
    call_with_rescue { subscription_service.create(hash) }
  end

  def subscription_get(sub_id)
    call_with_rescue { subscription_service.retrieve(sub_id) }
  end

  def subscription_update(sub_id, hash)
    call_with_rescue { subscription_service.update(sub_id, hash) }
  end

  def subscription_cancel(sub_id) 
    call_with_rescue { subscription_service.delete(sub_id) }
  end

  def invoice_create(hash)
    call_with_rescue { invoice_service.create(hash) }
  end

  def invoice_get(invoice_id)
    call_with_rescue { invoice_service.retrieve(invoice_id) }
  end

  def invoice_pay(invoice_id)
    call_with_rescue { invoice_service.pay(invoice_id) }
  end

  def coupon_list
    call_with_rescue { coupon_service.list() }
  end

  def coupon_find(coupon_id)
    call_with_rescue { coupon_service.retrieve(coupon_id) }
  end

  def promocode_list(args=nil)
    if args.nil?
      call_with_rescue { promocode_service.list() }
    else
      call_with_rescue { promocode_service.list(args) }
    end
  end

  def product_list(args=nil)
    if args.nil?
      call_with_rescue { product_service.list() }
    else
      call_with_rescue { product_service.list(args) }
    end
  end
  

  def good_response?(resp)
    !resp.is_a?(Hash)
  end

  private

  def call_with_rescue
      yield
    rescue => e
      handle_error(e)
  end

    
  def invoice_service
    Stripe::Invoice
  end

  def customer_service
    Stripe::Customer
  end

  def account_service
    Stripe::Account
  end

  def payment_service
    Stripe::Payment
  end

  def payment_method_service
    Stripe::PaymentMethod
  end

  def charge_service
    Stripe::Charge
  end

  def pay_intent_service
    Stripe::PaymentIntent
  end

  def setup_intent_service
    Stripe::SetupIntent
  end

  def refund_service
    Stripe::Refund
  end

  def oauth_service
    Stripe::OAuth
  end

  def webhook_service
    Stripe::Webhook
  end

  def plan_service
    Stripe::Plan
  end

  def price_service
    Stripe::Price
  end

  def subscription_service
    Stripe::Subscription
  end
  
  def coupon_service
    Stripe::Coupon
  end
 
  def product_service
    Stripe::Product
  end

  def promocode_service
    Stripe::PromotionCode
  end

  def handle_error(e)
    field = nil
    mssg = "Unknown Error"
    if e.class.name.partition("::") == "Stripe"
      if e.error.present?
        err = e.error
        if err.keys.include?(:message)
          mssg = err.message
        elsif err.keys.include?(:error_description)
          mssg = err.error_description
        else
          mssg = "Error"
        end
        if err.keys.include?(:param)
          field = err.param
        end
      end
    else
      mssg = e.message
    end
    return_error(mssg, field)
  end

  def return_error(mssg, field)
    Rails.logger.debug("Stripe Error - #{field}: #{mssg}")
    {errors: [mssg], field: field}
  end

  def handle_response
    begin
    rescue Stripe::CardError => e
      puts "Status is: #{e.http_status}"
      puts "Type is: #{e.error.type}"
      puts "Charge ID is: #{e.error.charge}"
      # The following fields are optional
      puts "Code is: #{e.error.code}" if e.error.code
      puts "Decline code is: #{e.error.decline_code}" if e.error.decline_code
      puts "Param is: #{e.error.param}" if e.error.param
      puts "Message is: #{e.error.message}" if e.error.message
    rescue Stripe::RateLimitError => e
      # Too many requests made to the API too quickly
    rescue Stripe::InvalidRequestError => e
      # Invalid parameters were supplied to Stripe's API
    rescue Stripe::AuthenticationError => e
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
    rescue Stripe::APIConnectionError => e
      # Network communication with Stripe failed
    rescue Stripe::StripeError => e
      # Display a very generic error to the user, and maybe send
      # yourself an email
    rescue => e
      # Something else happened, completely unrelated to Stripe
    end

  end


end