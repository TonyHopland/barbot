// modules =================================================
import db from './src/config/db.js';

// configuration ===========================================
db.sync({force: true}).then(function(success) {
    require('./src/config/initDb.js');
  },function(err){
    throw err;
  }
);
