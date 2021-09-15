const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
module.exports={
    entry: './src/main.js', //项目入口文件
    output:{
        path: path.resolve(__dirname, './dist'), //打包文件路径
        filename: 'build.js'
    },
    module:{
        rules:[
            { test: /\.vue$/, use:['vue-loader']},
            { test: /\.css$/, use:['style-loader','css-loader'] },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader' },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&name=[hash:8]-[name].[ext]' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, use: ['file-loader'] }
        ]
    },
    devServer:{
        // historyApiFallback:true, //所有路径都执行index.html
        // overlay: true, //将错误显示在html上
        port: 9000,
        host: 'localhost',
        hot: true, //开启热更新功能
        hotOnly: true, //不自动刷新浏览器，省去很多麻烦
        open:true
    },
    devtool: 'source-map',
    resolve:{
        alias:{
            utils: path.resolve(__dirname, 'utils')
        }
    },
    plugins:[
        //解析html模板
        new htmlWebpackPlugin({
            template:path.join(__dirname,"/src/index.html"),
            filename:"index.html",
        }),
        new vueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}