class Subscription < ApplicationRecord
  belongs_to :oem

  enum subscription_status: {"PENDING":0,"ACTIVE":1,"SUSPENDED":2,"CANCELLED":3,"CANCELLING":4, "EXPIRED":5}, _prefix: "sub_"
  enum payment_status: {"PENDING":0,"INCOMPLETE":1, "INCOMPLETE_EXPIRED":2, "TRIALING":3, "ACTIVE":4, "PAST_DUE":5, "CANCELED":6, "UNPAID":7}, _prefix: "pay_"
  enum confirm_status: {"PENDING":0,"ACCEPTED":1,"CANCELLED":2}, _prefix: "confirm_"

  attr_accessor :was_just_unpaid, :was_just_paid, :was_just_terminal, :do_subscription, :was_just_cancelled, :was_just_activated, :do_update, :previous_plan_id, :was_just_incremented, :coupon_id, :coupon_name, :payment_token

  validate :validate_plan

  before_save :check_status
  after_save :notify_of_status

  def self.terminal_payment_keys
    ["INCOMPLETE_EXPIRED","UNPAID","CANCELED"]
  end

  def terminal_payment_keys
    self.class.terminal_payment_keys
  end

  def self.active_payment_keys
    ["TRIALING","ACTIVE"]
  end

  def active_payment_keys
    self.class.active_payment_keys
  end

  def self.unpaid_keys
    ["INCOMPLETE","PAST_DUE"]
  end

  def unpaid_keys
    self.class.unpaid_keys
  end

  def unpaid?
    self.unpaid_keys.include?(self.payment_status)
  end

  def paid?
    self.active_payment_keys.include?(self.payment_status)
  end

  def terminated?
    self.terminal_payment_keys.include?(self.payment_status)
  end

  def is_active?
    !self.terminated?
  end

  def generate_setup_intent
    self.pps.create_setup_intent(self.oem.customer_id)
  end

  def self.get_plans
    resp = self.pps.get_prices
    if self.good_response?(resp)
      resp
    else
      []
    end
  end    

  def plans
    resp = self.pps.get_prices
    if self.good_response?(resp)
      resp
    else
      []
    end
  end

  def get_all_product_ids
    resp = self.pps.product_list
    if self.good_response?(resp)
      resp.map(&:id)
    else
      []
    end
  end

  def self.get_coupons
    resp = self.pps.get_coupons
    return [] unless self.good_response?(resp)
    resp
  end

  def coupons
    if !self.subscription_plan_id.present?
      self.class.get_coupons
    else
      self.get_coupons
    end
  end

  def self.display_coupons
    coupons = self.get_coupons
    return coupons unless coupons.present?
    coupons.map{|x| self.coupons_hash(x) }
  end

  def self.get_promocodes(coupon)
    promos = self.pps.promocode_list({coupon: coupon.id, active: true})
    return [] unless self.good_response?(promos)
    promos
  end

  def self.coupons_hash(coupon)
    pps = self.pps
    hash = Hash.new
    if coupon.present?
      full_coupon = self.pps.get_coupon({id: coupon.id, expand:['applies_to']})
      coupon.keys.each do |key|
        hash[key] = coupon[key]
      end
      #hash[:name] = coupon.name
      #hash[:amount_off] = coupon.amount_off
      #hash[:percent_off] = coupon.percent_off
      #hash[:duration] = coupon.duration
      hash[:codes] = []  
      if full_coupon.keys.include?(:applies_to)
        products = full_coupon.applies_to.products
      else
        products = self.get_all_product_ids
      end
      hash[:products] = products
      promocodes = self.get_promocodes(coupon)
      promocodes.each do |promo|
        hash[:codes] << promo.code
      end
    end
    hash
  end

  def self.display_coupons
    self.get_coupons.map{|x| self.coupons_hash(x) }
  end

  def self.display_plans
    self.get_plans.map{|x| self.plan_values_hash(x) }
  end

  def self.get_plan_ids
    self.get_plans.map(&:id)
  end

  def display_plans
    self.plans.map{|x| self.plan_values_hash(x) }
  end

  def display_coupons
    self.class.display_coupons
  end

  def plan_values
    self.plan_values_hash(self.subscription_plan)
  end

  def self.plan_values_hash(plan)
    if plan.present? && plan.active
      hash = {
        plan_id: plan.id,
        trial_period: plan.recurring.trial_period_days.present? ? "#{plan.recurring.trial_period_days} days" : "",      
        unit_price: (plan.unit_amount.to_f / 100),
        billed: "#{plan.recurring.interval_count > 1 ? "#{plan.recurring.interval_count} times " : ""}per #{plan.recurring.interval}",
        name: plan.nickname,
        product: plan.product
      }
      if plan[:tiers].present?
        hash[:tiers] = []
        min = 1
        plan.tiers.each do |tier|
          new_hash = {
            flat_amount: tier.flat_amount.present? ?  (tier.flat_amount.to_f / 100) : tier.flat_amount,
            unit_amount: tier.unit_amount.present? ? (tier.unit_amount.to_f / 100) : tier.unit_amount,
            starting_at: min,
            up_to: tier.up_to
          }
          hash[:tiers] << new_hash
          min = (tier.up_to.present? ? tier.up_to : 0) + 1
        end
      end
    else
      hash = {}
    end      
    hash
  end

  def plan_values_hash(plan)
    self.class.plan_values_hash(plan)
  end

  def sub_values
    self.subscription_values_hash
  end

  def get_plan_name
    return "" unless self.plan_name.present?
    self.plan_name
  end

  def subscription_values
    sub_hash = self.subscription_values_hash
    sub_hash.each do |k,v|
      sub_hash[k] = v.present? ? v.to_date : v
    end
  end

  def subscription_values_hash
    sub = self.subscription
    {
      next_invoice_date: self.next_invoice_date(sub),
      last_invoice_date: self.last_invoice_date(sub)
    }
  end

  def next_invoice_date(sub=nil)
    if !sub.present?
      sub = self.subscription
    end
    if sub.present? && !sub.cancel_at_period_end && !sub.canceled_at.present? && sub.current_period_end.present?
      Time.zone.at(sub.current_period_end).to_datetime.utc
    else
      nil
    end
  end 

  def last_invoice_date(sub=nil)
    if !sub.present?
      sub = self.subscription
    end
    if sub.present? && sub.current_period_start.present?
      Time.zone.at(sub.current_period_start).to_datetime.utc
    else
      nil
    end
  end

  def last_invoice(sub=nil)
    if !sub.present?
      sub = self.subscription
    end
    if sub.present? && sub.latest_invoice.present?
      invoice = self.pps.get_invoice(sub.latest_invoice)
      if self.good_response?(invoice)
        resp = invoice
      end
    end
    resp.present? ? resp : nil
  end

  def display_period_end
    end_period = self.period_end
    return "" unless end_period.present?
    end_period.strftime("%m/%d/%Y")
  end

  def period_end
    sub = self.subscription
    if sub.present? && sub.current_period_end.present?
      return Time.zone.at(sub.current_period_end).to_datetime.utc
    end
    nil
  end

  def subscription_values_hash
    sub = self.subscription
    {
      next_invoice_date: self.next_invoice_date(sub),
      last_invoice_date: self.last_invoice_date(sub)
    }
  end

  def last_invoice_amount
    invoice = self.last_invoice
    return 0 unless invoice.present?
    invoice.total.to_f / 100
  end

  def subscription_plan
    return nil unless self.subscription_plan_id.present?
    resp = self.pps.get_price(self.subscription_plan_id)
    return nil unless self.good_response?(resp)
    resp
  end

  def subscription_plan_name
    sub_plan = self.subscription_plan
    return nil unless sub_plan.present?
    sub_plan.nickname
  end

  def subscription
    return nil unless self.subscription_id.present?
    resp = self.pps.get_subscription(self.subscription_id)
    return nil unless self.good_response?(resp)
    resp
  end
 
  def get_user_count
    self.get_full_user_count
  end

  def get_full_user_count
    self.oem.user_count
  end

  def update_subscription_user_count
    options = {quantity: self.get_user_count}
    self.update_subscription_values(options)
  end 

  def update_subscription_values(options)
    return nil if self.terminated?
    return nil unless self.subscription.present?
    self.pps.update_subscription(self.subscription_id, options)
  end
 
  def gen_subscription_hash(plan_id,old_plan=nil)
    hash = {
      items: [
        {
          plan: plan_id,
          quantity: self.get_user_count
        }
      ],
      cancel_at_period_end: false,
      metadata: {
        oem_id: self.oem.id,
        oem_subscription_id: self.id
      }
    }
    if old_plan.nil?
      hash[:customer] = self.oem.customer_id
    else
      hash[:items] << {id: old_plan, deleted: true}
    end
    if self.oem.source_id.present?
      hash[:default_payment_method] = self.oem.source_id
    end
    if self.coupon_id.present?
      hash[:coupon] = self.coupon_id
    end
    hash
  end 

  def just_terminal?
    self.was_just_terminal || false
  end

  def just_paid?
    self.was_just_paid || false
  end

  def just_unpaid?
    self.was_just_unpaid || false
  end

  def do_subscription?
    self.do_subscription || false
  end

  def just_cancelled?
    self.was_just_cancelled || false
  end
    
  def just_activated?
    self.was_just_activated || false
  end

  def just_incremented?
    self.was_just_incremented || false
  end

  def do_update?
    self.do_update || false
  end


  def notify_of_status
    if self.just_unpaid?
      self.was_just_unpaid = false
    elsif self.just_paid?
      self.was_just_paid = false
    elsif self.just_terminal?
      self.was_just_terminal = false
      if self.oem.present? 
        self.oem.update(account_active: false)
        self.update(end_date: DateTime.now)
      end
    elsif self.do_subscription?
      self.do_subscription = false
      self.create_subscription  
    elsif self.do_update?
      self.do_update = false
      self.update_subscription_plan
    elsif self.just_cancelled?
      self.was_just_cancelled = false
      self.cancel_subscription
    end
    if self.just_activated?
      self.was_just_activated = false
      self.oem.update(account_active: true)
      self.update(start_date: DateTime.now)
    end
    if self.just_incremented?
      self.was_just_incremented = false
      self.update_subscription_user_count
    end
  end

  def create_subscription
    hash = self.gen_subscription_hash(self.subscription_plan_id)
    sub = self.pps.create_subscription(hash)
    if self.good_response?(sub) && sub.id.present?
      self.update(subscription_id: sub.id, plan_name: self.subscription_plan_name)
    else
      sub[:errors].each do |mssg|
        errors.add(:base, mssg)
      end
      raise ActiveRecord::RecordInvalid.new(self)
    end
  end

  def update_subscription_plan
    old_plan_id = self.pps.get_subscription(self.subscription_id).items.data[0].id
    sub_hash = self.gen_subscription_hash(self.subscription_plan_id)
    resp = self.pps.update_subscription(self.subscription_id, self.gen_subscription_hash(self.subscription_plan_id, old_plan_id))
    if !self.good_response?(resp) 
      resp[:errors].each do |mssg|
        errors.add(:base, mssg)
      end
      raise ActiveRecord::RecordInvalid.new(self)
    else
      self.update(plan_name: self.subscription_plan_name)
    end
  end

  def cancel_subscription
    return nil unless self.subscription_id.present? && !self.terminated?
    resp = self.pps.update_subscription(self.subscription_id, {cancel_at_period_end: true})
    if self.good_response?(resp)
      self.update(subscription_status:"CANCELLING")
    end
  end

  def cancel_subscription_now
    return nil unless self.subscription_id.present? && !self.terminated?
    resp = self.pps.cancel_subscription(self.subscription_id)
    if self.good_response?(resp)
      self.update(subscription_status:"CANCELLED")
    end
  end


private


  def validate_plan
    if self.payment_token.present?
      resp = self.pps.update_default_card(self.oem.customer_id, self.payment_token)
      if self.good_response?(resp) && resp.default_source.present?
        self.oem.update(source_id: resp.default_source)
      else
        resp[:errors].each do |mssg|
          errors.add(:base, mssg)
        end
      end
    end
    if !self.errors.any? && subscription_plan_id_changed? && self.subscription_plan_id.present?
      if !self.oem.source_id.present?
        errors.add(:base, "no payment method on file")
      end
      if !self.class.get_plan_ids.include?(self.subscription_plan_id)
        errors.add(:subscription_plan_id, "invalid")
      end
    end
    if !self.errors.any? && self.coupon_code.present? && self.subscription_plan_id.present?
      pps = self.pps
      promos = pps.get_promocodes
      good_promos = promos.reject{|x| !x.active }
      good_codes = good_promos.map(&:code)
      if !good_codes.include?(self.coupon_code)
        errors.add(:base, "The Coupon #{self.coupon_code} is not valid")
      else
        coupon_id = nil
        good_promos.each do |promo|
          if promo.code == self.coupon_code
            coupon_id = promo.coupon.id
            coupon_name = promo.coupon.name
          end
        end
        if !coupon_id.present?
          errors.add(:base, "The Coupon #{self.coupon_code} is not valid")
        else
          self.coupon_id = coupon_id
          self.coupon_name = coupon_name
        end
      end
    end         
  end

  def check_status
    if payment_status_changed?
      case(self.payment_status)
        when *self.unpaid_keys
          self.was_just_unpaid = true
          self.paid_up = false
          self.subscription_status = "SUSPENDED"
          self.confirm_status = "PENDING"
        when *self.active_payment_keys
          self.was_just_paid = true
          self.paid_up = true
          self.subscription_status = "ACTIVE"
          if self.confirm_status != "ACCEPTED"
            self.confirm_status = "ACCEPTED"
          end
        when *self.terminal_payment_keys
          self.was_just_terminal = true
          self.paid_up = false
          if self.payment_status == "CANCELED"
            self.subscription_status = "CANCELLED"
          else
            self.subscription_status = "EXPIRED"
          end
          self.confirm_status = "CANCELLED"
      end
    end
    if confirm_status_changed?
      if self.confirm_status == "ACCEPTED"
        if self.payment_status == "PENDING"
          if !self.subscription_plan_id.present?
            errors.add(:subscription_plan_id, "required")
            throw(:abort)
          elsif self.oem.user_count < 1
            errors.add(:base, "At least 1 user required before activating a subscription")
            throw(:abort)
          elsif !self.subscription_id.present? 
            self.do_subscription = true
          end
        elsif self.terminated? 
          self.do_subscription = true
        end
      elsif self.confirm_status == "CANCELLED" && !self.terminated?
        self.was_just_cancelled = true
      end
    end
    if subscription_status_changed?
      if self.subscription_status == "ACTIVE"
        self.was_just_activated = true
      end
    end   
    if subscription_plan_id_changed? && self.subscription_id.present?
      self.do_update = true
      self.previous_plan_id = self.subscription_plan_id_was
    end
    if user_count_changed? && self.is_active?
      self.was_just_incremented = true
    end   
  end

end
