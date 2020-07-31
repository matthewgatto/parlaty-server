# README

### Prep

Run `rake db:create && rake db:migrate && rake db:seed` then `npm install && yarn install --check-files --trace`
Run `rake procedures:import_languages`

### Running the development server

Run both `rails s` & `ruby bin/webpack-dev-server`

Then open your browser and point it to localhost:3000

### Login credentials

user: padmin@gmail.com
password: password

# Deploy to prod

export RAILS_LOG_TO_STDOUT=true
export PS_DATABASE_PASSWORD=xxxxxxx
export RAILS_ENV=production
export SECRET_KEY_BASE=xxxxxxxx
cap production deploy BRANCH=branch-to-deploy

# Prod

nginx web server
mysql database
Linode linux server
deploy is the user on sandbox.parlaty.com which receives the
production deployment
~deploy/parlaty-server/current is the current release
~deploy/storage is the folder where the images and videos are stored


