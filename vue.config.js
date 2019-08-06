const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  publicPath: 'vue-tour-steps',
  outputDir: (() => {
    switch (process.env.VUE_APP_CONFIG) {
      case 'lib':
        return 'dist'
      case 'docs':
        return 'docs'
    }
  })(),
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },

    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode:
          process.env.NODE_ENV === 'production' ? 'static' : 'disabled',
        defaultSizes: 'gzip',
        openAnalyzer: false
      })
    ]
  }

  // productionSourceMap: false
}
