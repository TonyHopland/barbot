import { database } from './src/database/db.js';
import populateTestdata from './src/database/initDb.js';

database.init().sync({force: true}).then((database) => { 
    populateTestdata(database.models);
  },(err) => {
    throw err;
  }
);
