import { database } from './src/database/db';
import populateTestdata from './src/database/initDb';

database.init().sync({ force: true }).then((db) => {
  populateTestdata(db.models);
}, (err) => {
  throw err;
});
