import initRoutes from './app/routes';
import { database } from './database/db';


export const initApi = (express) => {
  database.init().sync();
  initRoutes(express);
};

export default { initApi };
