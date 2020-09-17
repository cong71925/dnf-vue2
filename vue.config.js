module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost/tp/public/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: false,//如果需要跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  }
}