# frozen_string_literal: true

class LanguageSerializer
  class << self
    def languages_as_json(languages)
      {
        languages: languages.map do |language|
          {
            id: language.id,
            name: "#{language.name}-#{language.abbreviation.upcase} (#{language.default_name.capitalize})",
          }
        end
      }
    end


  end
end
