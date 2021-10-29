const path = require('path')

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
}
