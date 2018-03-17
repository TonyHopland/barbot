import Sequelize from 'sequelize';

export const name = 'recipe';

export default (sequelize) => sequelize.define(name, {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    name: 		Sequelize.STRING,
	  image:		Sequelize.STRING,
    notes:		Sequelize.TEXT,
  });
