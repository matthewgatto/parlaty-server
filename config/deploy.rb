# config valid for current version and patch releases of Capistrano
lock "~> 3.17.0"

set :application, "parlaty-server"
#set :repo_url, "https://aaa:bbbb@bitbucket.org/jedmahonisgroup/parlaty-server.git"
#set :repo_url, "https://peterobrien:XXXXXX!@bitbucket.org/jedmahonisgroup/parlaty-server.git"
#set :repo_url, "git@bitbucket.org:jedmahonisgroup/parlaty-server.git"
set :repo_url, "git@bitbucket.org:Parlaty/parlaty-server.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, ENV['BRANCH'] if ENV['BRANCH']

# Default deploy_to directory is /var/www/parlaty-server
# set :deploy_to, "/var/www/parlaty-server"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
#
#

# Default value for :log_level is :debug
# set :log_level, :debug

# # Deploy to the user's home directory
set :deploy_to, "/home/deploy/#{fetch :application}"

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads', 'public/packs', 'node_modules'
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/packs", ".bundle", "node_modules"

# Only keep the last 5 releases to save disk space
set :keep_releases, 5

# Optionally, you can symlink your database.yml and/or secrets.yml file from the shared directory during deploy
# This is useful if you don't want to use ENV variables
# append :linked_files, 'config/database.yml', 'config/secrets.yml'

before "deploy:assets:precompile", "deploy:yarn_install"
namespace :deploy do
  desc "Run rake yarn install"
  task :yarn_install do
    on roles(:web) do
      within release_path do
        # execute("cd #{release_path} && yarn install --check-files --silent --no-progress --no-audit --no-optional")
        execute("cd #{release_path} && yarn install --check-files --progress --trace ")
        # execute("cd #{release_path} && npx browserslist@latest --update-db")
      end
    end
  end
end

after "deploy:migrate", "deploy:import_languages"
namespace :deploy do
  desc 'Runs rake procedures:import_languages'
  task :import_languages do
    on roles(:web) do
      within release_path do
        execute :rake, 'procedures:import_languages'
      end
    end
  end
end