import Sequelize from 'sequelize';

export const name = 'recipepart';

export default (sequelize) => sequelize.define(name, {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    amount:		Sequelize.DECIMAL,
    order:	 	Sequelize.INTEGER,
    startdelay: Sequelize.INTEGER,
  });
