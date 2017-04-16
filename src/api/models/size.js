module.exports = function(sequelize, DataTypes) {
  var Size = sequelize.define('size', {
  	id: { type: DataTypes.INTEGER, primaryKey: true },
  	name: DataTypes.STRING,
    cl: DataTypes.DECIMAL
  }, {
	timestamps: false,
  })

  return Size
};
