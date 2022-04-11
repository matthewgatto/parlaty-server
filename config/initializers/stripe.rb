require "stripe"
Stripe.api_key = Rails.application.credentials.STRIPE_SECRET_KEY 
