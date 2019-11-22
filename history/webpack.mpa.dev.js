const glob = require("glob")
const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const setMap = ()=>{
    const entry = {}
    const htmlwebpackplugins = [];

    const entryFiles = glob.sync(path.join(`${process.cwd()}`,'./src/page/*/index.js'))
    //获取匹配到的入口文件数组。

    entryFiles.map((item)=>{
        //对入口文件数组进行遍历操作
            const entryFile = item;
            const match = entryFile.match(/page\/(.*)\/index\.js/);
            //从拿到的入口文件路径中匹配出入口名。
            const pageName = match && match[1]
            console.log('--pageName',pageName)

            entry[pageName] = entryFile
            htmlwebpackplugins.push(
                new HTMLWebpackPlugin({
                    template:path.join(__dirname,`./../src/page/${pageName}/index.html`),
                    filename:`${pageName}.html`,
                    chunks:[pageName],
                    inject:true,
                    minify:{
                        html5:true,
                        collapseWhitespace:false,
                        preserveLineBreaks:false,
                        minifyCSS:true,
                        minifyJS:true,
                        removeComments:true
                    }
                })
            )
        })
    console.log(entry)
    return {
        entry,
        htmlwebpackplugins
    }
}

const {entry,htmlwebpackplugins} = setMap()

module.exports = {
    entry:entry,
    output:{
        path:path.join(__dirname+"./../dist"),
        filename:'[name].js'
    },
    mode:'none',
    module:{
        rules: [
            {
                test: /\.js$/,
                use:"babel-loader"
            },
            {
                test: /\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test:/.(png|jpg|gif|jpeg)$/,
                use:[{
                        loader:"url-loader",
                        options:{
                            limit:102400
                        }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    "file-loader"
                ]
            }
        ]
    },    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //热更替（自动刷新）
    ].concat(htmlwebpackplugins),
    devtool:'inline-source-map',
    devServer:{
        contentBase:path.join(__dirname+"./../dist"),
        hot:true    
    }
}