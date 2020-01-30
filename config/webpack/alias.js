const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '..', '..', 'app/javascript/src/components'),
      '@containers': path.resolve(__dirname, '..', '..', 'app/javascript/src/containers'),
      '@assets': path.resolve(__dirname, '..', '..', 'app/javascript/src/assets'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
      '@selectors': path.resolve(__dirname, '..', '..', 'app/javascript/src/redux/selectors'),
      '@actions': path.resolve(__dirname, '..', '..', 'app/javascript/src/redux/actions'),
      '@sagas': path.resolve(__dirname, '..', '..', 'app/javascript/src/redux/sagas'),
      '@types': path.resolve(__dirname, '..', '..', 'app/javascript/src/redux/types'),
      '@reducers': path.resolve(__dirname, '..', '..', 'app/javascript/src/redux/reducers')
    }
  }
}
