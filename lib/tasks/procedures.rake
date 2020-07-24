namespace :procedures do
  desc "import languages"
  task import_languages: :environment do
    languages = [
      {name: '中文', abbreviation: 'zh', default_name: 'chinese'},
      {name: 'English', abbreviation: 'en', default_name: 'english'},
      {name: 'Русский', abbreviation: 'ru', default_name: 'russian'},
      {name: 'Española', abbreviation: 'es', default_name: 'spanish'},
    ]
    languages.each{ |language| Language.create(language) }
  end

end
