const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const file = require('./file')
const alias = require('./alias')
const dotenv = require('dotenv')

environment.loaders.prepend('file', file)
environment.config.merge(alias)

dotenv.config({path: __dirname + '/../../.env'})

environment.plugins.insert(
    "Environment",
    new webpack.EnvironmentPlugin(process.env)
  )


module.exports = environment
