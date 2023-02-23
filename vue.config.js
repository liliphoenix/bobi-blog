const webpack = require("webpack")
module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    //代理跨域,用webpack进行跨域问题
    devServer: {
        proxy: {
            '/api': {
                //基础服务器
                target: 'http://localhost:3000',
                // pathRewrite: { '^/api': '' },
            },
        },
    },
    configureWebpack: {

        plugins: [
     
           new webpack.ProvidePlugin({
     
             $:"jquery",
     
             jQuery:"jquery",
     
             "windows.jQuery":"jquery"
     
           })
     
         ]
     
     }

}


