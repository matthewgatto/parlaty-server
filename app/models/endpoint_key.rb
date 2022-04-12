class EndpointKey < ApplicationRecord

  def self.by_endpoint(controller, action)
    self.find_by(endpoint_controller: controller, endpoint_action:action)
  end


  def validate_webhook(payload, sig_header)
    self.pps.validate_webhook(payload, sig_header, self.endpoint_secret)
  end


end
