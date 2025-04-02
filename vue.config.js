const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    // transpileDependencies: true,
    outputDir: '../cordova/www',
    publicPath: './',
    devServer: {

      //以下两个属性用于内网穿透
      // historyApiFallback:true,
      // allowedHosts:"all",

      proxy: {
        '/calculate': {
          target: 'http://192.168.31.110:5000',
          changeOrigin: true,
          pathRewrite: {
            '^/calculate': '/calculate'
          }
        }
      }
    },


})
