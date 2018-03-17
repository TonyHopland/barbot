import initRoutes from './app/routes';
import { database } from './database/db.js'


export const initApi = (express) => {
    database.init().sync();
    initRoutes(express);
}