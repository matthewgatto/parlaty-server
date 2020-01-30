const { environment } = require('@rails/webpacker')
const file = require('./file')
const alias = require('./alias')

environment.loaders.prepend('file', file)
environment.config.merge(alias)

module.exports = environment
