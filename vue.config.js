module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components',
        utils: '@/utils',
        baseUi: '@/base-ui'
      }
      // extensions: ['.js', '.json', '.jsx', '.css', 'ts']
    }
  }
}
