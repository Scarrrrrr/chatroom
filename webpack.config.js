const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports={
    entry: './src/main.js', //项目入口文件
    output:{
        path: path.resolve(__dirname, './dist'), //打包文件路径
        publicPath: '/dist/', 
        filename: 'build.js'
    },
    module:{
        rules:[
            { test: /\.vue$/, use:['vue-loader']},
            { test: /.css/, use:['style-loader','css-loader'] }
        ]
    },
    devServer:{
        historyApiFallback:true, //所有路径都执行index.html
        overlay: true, //将错误显示在html上
        port: 9000,
        host: 'localhost',
        hot: true,
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
        new vueLoaderPlugin()
    ]
}