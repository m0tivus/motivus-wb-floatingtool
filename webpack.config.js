const path = require('path')
const VersionFile = require('webpack-version-file')

module.exports = {
  entry: { worker: './node/worker.js', workerLoader: './node/workerLoader.js' },
  target: 'node',
  mode: 'production',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new VersionFile({
      output: 'dist/VERSION',
      templateString: '<%= version %>',
    }),
  ],
}
