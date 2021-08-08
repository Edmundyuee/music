//项目路径引用别名
var path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets' : '@/assets',
                'common' : '@/common',
                'components' : '@/components',
                'network' : '@/network',
                'views' : '@/views',
                'commonjs' : '@/commonjs'
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://autumnfish.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}