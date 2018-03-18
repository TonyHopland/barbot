import express from 'express';
import { initApi } from './src';

const BarbotApi = express();

var apiPort = 1337;

initApi(BarbotApi);

BarbotApi.listen(apiPort, () => console.log('Barbot API is listening on port ' + apiPort))
