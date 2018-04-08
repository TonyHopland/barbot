import Sequelize from 'sequelize';

export const name = 'pump';

export default sequelize => sequelize.define(name, {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  msPerCl: Sequelize.INTEGER,
});
