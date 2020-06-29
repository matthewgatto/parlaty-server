const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '..', '..', 'app/javascript/components/components'),
      '@containers': path.resolve(__dirname, '..', '..', 'app/javascript/components/containers'),
      '@assets': path.resolve(__dirname, '..', '..', 'app/javascript/components/assets'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/components/utils'),
      '@selectors': path.resolve(__dirname, '..', '..', 'app/javascript/components/redux/selectors'),
      '@actions': path.resolve(__dirname, '..', '..', 'app/javascript/components/redux/actions'),
      '@sagas': path.resolve(__dirname, '..', '..', 'app/javascript/components/redux/sagas'),
      '@types': path.resolve(__dirname, '..', '..', 'app/javascript/components/redux/types'),
      '@reducers': path.resolve(__dirname, '..', '..', 'app/javascript/components/redux/reducers')
    }
  }
}
