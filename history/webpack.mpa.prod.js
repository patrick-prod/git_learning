const glob = require("glob")
const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const OptimizeCSSAssetsplugin = require("optimize-css-assets-webpack-plugin")

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
                        html5:false,
                        collapseWhitespace:false,
                        preserveLineBreaks:false,
                        minifyCSS:true,
                        minifyJS:true,
                        removeComments:true
                    }
                })
            )
        })

    return {
        entry,
        htmlwebpackplugins
    }
}

const {entry,htmlwebpackplugins} = setMap()

module.exports = {
    entry,
    output:{
        path:path.join(__dirname+"./../dist"),
        filename:'[name]_[hash:8].js'
    },
    mode:'production',
    module:{
        rules: [
            {
                test: /\.js$/,
                use:"babel-loader"
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=>{
                                require("autoprefixer")({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            }
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=>{
                                require("autoprefixer")({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            }
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=>{
                                require("autoprefixer")({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            }
                        }
                    }
                ]
            },
            {
                test:/.(png|jpg|gif|jpeg)$/,
                use:[{
                        loader:"url-loader",
                        options:{
                            limit:102400,
                            name:'[name]_[hash:8].[ext]'
                        }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:[{
                    loader:"file-loader",
                    options:{
                        name:'[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:"[name]_[contenthash:8].css"
        }),
        new OptimizeCSSAssetsplugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),
        //自动刷新+清理目录产物
    ].concat(htmlwebpackplugins),
    stats:"errors-only"
}