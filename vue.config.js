const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const webpack = require('webpack')
//  选择路径和开发路径
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '/'

module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    ]
  },
  chainWebpack: config => {
  	config.resolve.alias
  	.set('@', resolve('src'))
  	.set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
  	 proxy: 'http://localhost:3000'
  }
}
