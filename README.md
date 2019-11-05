# README

### Prep

Run `rake db:create && rake db:migrate && rake db:seed` then `npm install && yarn install --check-files --trace`

Update 20191030:  due to warnings I did the following:

npm install --save-dev 'typescript@latest'

npm install --save-dev 'webpack@^4.0.0'

### Running the development server

Run both `rails s` & `ruby bin/webpack-dev-server`

Then open your browser and point it to localhost:3000

### Login credentials

user: oem@gmail.com

password: password

# Deploy to prod

export RAILS_LOG_TO_STDOUT=true
export PS_DATABASE_PASSWORD=xxxxxxx
export RAILS_ENV=production
export SECRET_KEY_BASE=xxxxxxxx
cap --trace production deploy BRANCH=tmp-deploy-pete
