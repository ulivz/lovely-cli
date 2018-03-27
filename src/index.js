#!/usr/bin/env node

const command = process.argv[2]
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const defaultConfig = require('./default-webpack-config')

const defaultDevConfig = Object.assign({}, defaultConfig, {
  mode: 'development',
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
})

const defaultProdConfig = Object.assign({}, defaultConfig, { mode: 'production' })

if (command === 'dev') {
  const devServerOptions = Object.assign(defaultDevConfig.devServer || {}, {
    contentBase: '.',
    hot: true,
    host: 'localhost'
  })
  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, devServerOptions)
  const compiler = Webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, devServerOptions)
  devServer.listen(8080, 'localhost', () => {
    console.log('[Lovely-CLI] Starting server on http://localhost:8080')
  })

} else if (command === 'build') {
  Webpack(defaultProdConfig, function (err, stats) {
    if (err) {
      throw err
    }
    if (stats.hasErrors()) {
      console.log().log('[Lovely-CLI]', stats.toString());
    }
    process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')
  })

} else {
  console.log('I am a lovely CLI.')
}