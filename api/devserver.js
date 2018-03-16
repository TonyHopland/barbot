import express from 'express';
import { initApi } from './src';

const BarbotApi = express();

var apiPort = 1337;

initApi(BarbotApi);

BarbotApi.listen(apiPort, () => console.log('Barbot API is listening on port ' + apiPort))


// // server.js

// // modules =================================================
// var express        = require('express');
// var bodyParser     = require('body-parser');
// var methodOverride = require('method-override');
// var sequelize 	   = require("sequelize");
// var db      	     = require('./src/api/config/db.js');
// var routes				 = require('./src/api/app/routes');
// var path 					 = require('path');

// // configuration ===========================================

// // config files



// var port = process.env.PORT || 8080; // set our port

// // get all data/stuff of the body (POST) parameters


// var WebpackDevServer = require("webpack-dev-server");
// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config.js');
// var compiler = webpack(webpackConfig);

// const server = new WebpackDevServer(compiler, {
// 	stats: {
// 		colors: true
// 	},
//   contentBase: path.join(__dirname, "/"),
//   historyApiFallback: false,
//   clientLogLevel: "info",
//   quiet: false,
//   noInfo: false,
//   setup: function(app) {
// 		routes(app);
//     app.use(bodyParser.json()); // parse application/json
//     app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//     app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//     app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//     app.use(express.static(__dirname + '/dist')); // set the static files location /public/img will be /img for users
//   },

// });

// server.listen(8080, "127.0.0.1", function() {
// 	console.log("Starting server on http://localhost:8080");
// });

// // start DB ===============================================
// db.sequelize.sync();
