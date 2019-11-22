const merge = require("webpack-merge")
const path = require("path")
const webpack = require("webpack")
const baseConfig = require("./webpack.base")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const devConfig = {
    mode:'none',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //热更替（自动刷新）
        new CleanWebpackPlugin({
            dry: false,     //默认false  dry为true时，模拟删除，加删除，不会真的删掉文件
            verbose :false, // 默认false verbose为true时 显示日志， 当dry为true时，总是会打印日志，不管verbose是什么值
            cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
            // #cleanOnceBeforeBuildPatterns打包前做的一些事，
            // #忽略掉不需要删除的文件，相当于exclude,被忽略的文件需要在开头加上 "!"号，数组中必须带有"**/*"通配符
            // #否则dist下的文件都不会被删除
            // # 删除指定文件/文件夹   path.resolve(__dirname, 'test6')
            cleanOnceBeforeBuildPatterns: ["!/assets"],
         })
        //目录清理
    ],
    devtool:'source-map',
    //source-map代码检查
    devServer:{
        //webpack-dev-server服务器
        contentBase:path.join(__dirname+"./../dist"),
        hot:true,
        stats:'errors-only' ,
        historyApiFallback: {
            index: '/',
        },
        overlay: true,
        public:'http://127.0.0.1:8080'
    }
}


module.exports = merge(baseConfig,devConfig)