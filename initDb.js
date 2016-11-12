// modules =================================================
var db      	   = require('./src/api/config/db.js');

// configuration ===========================================
db.sequelize.sync({force: true}).then(function(success) {
    require('./src/api/config/initDb.js');
  },function(err){
    throw err;
  }
);
