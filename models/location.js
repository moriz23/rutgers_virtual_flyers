'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Location;
};