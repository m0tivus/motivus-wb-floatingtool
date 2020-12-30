module.exports = {
  webpack: {
    configure: ({ entry, output, optimization, ...config }) => ({
      ...config,
      entry: {
        loader: './src/widgetLoader.js',
        main: entry[0],
      },
      output: {
        ...output,
        filename: 'static/js/[name].js',
      },
      optimization: {
        ...optimization,
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false
          },
        },
      },
    }),
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = 'static/css/[name].css'
          return webpackConfig
        },
      },
      options: {},
    },
  ],
}
