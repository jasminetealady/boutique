  desc "Precompiles assets for production to deploy to Heroku"
  task :heroku_assets do
    RAILS_ENV=production bundle exec rake assets:precompile
  end

