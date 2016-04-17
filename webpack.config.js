var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    context: __dirname,
    output: {
        path: __dirname + '/react/bin/',
        publicPath: '/bin/',
        filename: "app.min.js"
    },
    devtool: debug ? "inline-sourcemap" : null,
    entry:[
        'webpack-hot-middleware/client',
        './react/app.jsx'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test   : /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery",
            React: "react",
            ReactDOM: "react-dom"
        }),
    ],
};
