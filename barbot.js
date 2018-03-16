var express = require('express');
var api =require('./api/dist');

const BarbotApi = express();

var webPort = 80;
var apiPort = 1337;

api.initApi(BarbotApi);


BarbotApi.listen(apiPort, () => console.log('Barbot API is listening on port ' + apiPort))