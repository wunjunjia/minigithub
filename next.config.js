const webpack = require('webpack')
const WithCss = require('@zeit/next-css')
// const WithBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { CLIENT_ID, GITHUB_OAUTH_URL } = require('./config')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

const config = {
  distDir: 'dist',
  // 是否给每个路由生产Etage
  generateEtags: true,
  pageExtensions: ['js', 'jsx'],
  env: {
    NODE_ENV: 'development'
  }
}

module.exports = WithCss({
  webpack(config) {
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  },
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL
  }
})

// module.exports = WithBundleAnalyzer(WithCss({
//   webpack(config) {
//     config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
//     return config
//   },
//   publicRuntimeConfig: {
//     GITHUB_OAUTH_URL
//   },
// @zeit/next-bundle-analyzer
// analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
// bundleAnalyzerConfig: {
//   server: {
//     analyzerMode: 'static',
//     reportFilename: './bundle/server.html'
//   },
//   browser: {
//     analyzerMode: 'static',
//     reportFilename: './bundle/client.html'
//   }
// }
// }))
