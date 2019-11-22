const merge = require("webpack-merge")
const baseConfig = require("./webpack.base")
const OptimizeCSSAssetsplugin = require("optimize-css-assets-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
// const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")

const prodConfig = {
    mode:'production',
    plugins:[
        new OptimizeCSSAssetsplugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),
        //css代码混淆
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

        // new HtmlWebpackExternalsPlugin({
        //     externals:[]
        // })
        //抽离公共部分,因为我们没有东西要抽离，所以先注释掉，要不然会报错
    ]
}

module.exports = merge(baseConfig,prodConfig)