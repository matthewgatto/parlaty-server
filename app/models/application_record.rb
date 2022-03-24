class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.pps
    PaymentProcessingService.new
  end

  def pps
    self.class.pps
  end

  def self.nil_response(resp)
    !resp.is_a?(Hash) ? resp : nil
  end

  def nil_response(resp)
    self.class.nil_response(resp)
  end

  def self.good_response?(resp)
    self.nil_response(resp).present?
  end

  def good_response?(resp)
    self.class.good_response?(resp)
  end


end
