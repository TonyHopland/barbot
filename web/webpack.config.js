var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry:{
      app: ['webpack-dev-server/client?http://localhost:8080','webpack/hot/dev-server','./src/web/app/App.jsx'],
      vendor: ['jquery', './src/web/lib/materialize/materialize.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: '/',
        filename: "js/[name].min.js"
    },
    externals: {
      $: "jquery"
    },
    devtool: debug ? "source-map" : null,
    resolve: {
      modules: [
        path.resolve('./src/web'),
        path.resolve('./node_modules')
      ],
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        jquery: "jquery/src/jquery"
      },
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            exclude: /(lib)/,
            enforce: "pre",
            use: {
              loader: 'eslint-loader',
              options: {
                configFile: './.eslintrc',
                emitWarning: true,
                failOnError: false,
                failOnWarning: false,
              }
            }
          },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: 'babel-loader'
          },
          {
            test   : /\.scss$/,
            exclude: /(node_modules)/,
            use: [
              {loader: 'style-loader'},
              {loader: 'css-loader'},
              {loader: 'sass-loader'},
              {
                loader: 'postcss-loader',
                options:{
                  plugins: function () {
                                  return [
                                    require('autoprefixer')
                                  ];
                                }
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf)$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit:10000,
                name:'resources/fonts/[name].[ext]'
              }
            }
          },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
            $: "jquery",
            jQuery: "jquery"
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
