import Sequelize from 'sequelize';

export const name = 'ingredient';

export default (sequelize) => sequelize.define(name, {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    cl: Sequelize.DECIMAL
  });
