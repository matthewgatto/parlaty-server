require 'jwt'

class Auth
	ALG = "HS256"

	# return the token encrypted with the payload
	def self.encode(payload)
		JWT.encode(payload, secret, ALG)
	end

	# return payload information
	def self.decode(token)
		# returns array of payload, and header
		# raise exception if signature is not valid
		decoded = JWT.decode(token, secret, true, { algorithm: ALG })
		decoded.first
	end

	private_class_method def self.secret
		Rails.application.secrets.secret_key_base
	end

end