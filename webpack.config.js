var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    output: {
        path: __dirname + '/dist/',
        publicPath: '/',
        filename: "js/app.min.js"
    },
    devtool: debug ? "cheap-module-source-map" : null,
    entry:[
        './src/web/app/app.jsx',
        'webpack-hot-middleware/client?overlay=false'
    ],
    resolve: {
      root: [
        path.resolve('./src/web'),
        path.resolve('./node_modules')
      ],
      extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
        preLoaders: [
          {
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            loaders: ['eslint-loader']
          },
        ],
        loaders: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader'
            },
            {
              test   : /\.scss$/,
              exclude: /(node_modules)/,
              loaders: ['style', 'css', 'sass', 'postcss']
            },
            {
              test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
              exclude: /(node_modules)/,
              loader: 'url?limit=10000'
            },
            {
              test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
              exclude: /(node_modules)/,
              loader: 'file'
            }
        ],
        eslint: {
         configFile: './.eslintrc',
         emitWarning: true,
         failOnError: false,
         failOnWarning: false,
       }
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom"
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('develop')
          }
        }),
        new copyWebpackPlugin([
            { from: 'src/web/resources', to: 'resources' }
        ]),
        new copyWebpackPlugin([
            { from: 'src/web/index.html'}
        ])
    ],
};
