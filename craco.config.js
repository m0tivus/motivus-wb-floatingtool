const getEntries = (env, entry) => {
  let res = {
    main: entry[0],
  }

  if (env === 'production') {
    res.loader = './src/widgetLoader.js'
    return res
  }
  return entry
}

module.exports = {
  webpack: {
    configure: ({ entry, output, optimization, ...config }, { env }) => ({
      ...config,
      entry: getEntries(env, entry),
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
