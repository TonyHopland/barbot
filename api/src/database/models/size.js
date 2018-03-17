import Sequelize from 'sequelize';

export const name = 'size';

export default (sequelize) => sequelize.define(name, {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    name: Sequelize.STRING,
    cl: Sequelize.DECIMAL
  });
