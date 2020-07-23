class LanguagesController < ApplicationController
  before_action :require_login

  # GET /languages
  def index
    authorize Language
    render json: LanguageSerializer.languages_as_json(Language.all), status: :ok
  end
end
