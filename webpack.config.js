const path = require('path')
const VersionFile = require('webpack-version-file')

module.exports = {
  entry: './node/worker.js',
  output: {
    filename: 'worker.js',
  },
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
