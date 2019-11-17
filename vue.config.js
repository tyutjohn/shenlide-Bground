/*
 * @Author: johnwang
 * @since: 2019-11-02 15:19:55
 * @lastTime: 2019-11-08 22:01:12
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/api':{
                target:'http://123.206.65.183:9027/api/',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        },
    },
    publicPath:'./'
}