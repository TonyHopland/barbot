module.exports = function(sequelize, DataTypes) {
  var Size = sequelize.define('Size', {
	id: DataTypes.INTEGER,
	name: DataTypes.STRING,
    cl: DataTypes.DECIMAL
  }, {
	timestamps: false,
  })
 
  return Size
};