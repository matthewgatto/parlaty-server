# frozen_string_literal: true

class SubscriptionSerializer
  class << self
   
    def subscription_as_json(subscription)
      { subscription: simple_subscription_with_plans_as_json(subscription) }
    end

    def simple_subscription_as_json(subscription)
      subscription.as_json
    end

    def simple_subscription_with_plans_as_json(subscription)
      simple_subscription_as_json(subscription).merge!({
        plan: subscription.plan_values.as_json,
        plans: subscription.display_plans.as_json,
      })
    end

    def setup_intent(subscription)
      { setup_intent: subscription.generate_setup_intent}
    end

  end
end
