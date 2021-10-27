// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}