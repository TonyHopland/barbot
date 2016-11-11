// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var sequelize 	   = require("sequelize");
var db      	   = require('./src/api/config/db.js');

// configuration ===========================================

// config files



var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/dist')); // set the static files location /public/img will be /img for users


var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

// routes ==================================================

require('./src/api/app/routes')(app); // configure our routes

// start DB ===============================================
db.sequelize.sync();
//Use this if you want to clean and populate database on startup
/*db.sequelize.sync({force: true}).then(function(success) {
    require('./config/initDb.js');
  },function(err){
    throw err;
  }
);*/

// start app ===============================================
var server = app.listen(port);							// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app




var drinkCreator = require('./src/api/app/controllers/drinkController.js');
var hardware = require('./src/api/app/controllers/pumpHardware.js');
var io = require('socket.io').listen(server);

drinkCreator.Init(io.sockets);

io.sockets.on('connection', function (socket) {
  socket.on("Start Pump", function (pump) {
    hardware.startPump(pump);
  });

  socket.on("Stop Pump", function (pump) {
    hardware.stopPump(pump);
  });

  socket.on("Pump Ms", function (pump, ms) {
    hardware.pumpMilliseconds(pump, ms);
  });

});