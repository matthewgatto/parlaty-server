const { environment } = require('@rails/webpacker')
const file = require('./file')

environment.loaders.prepend('file', file)

module.exports = environment
