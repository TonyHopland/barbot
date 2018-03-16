import initRoutes from './app/routes';
import db from './config/db.js'


export const initApi = (express) => {
    db.sync();
    initRoutes(express);
}