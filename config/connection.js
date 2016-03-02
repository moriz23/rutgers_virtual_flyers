var mysql = require("mysql");
var Sequelize = require('sequelize');

if(process.env.NODE_ENV === 'production') {
  // HEROKU DB
  console.log(process.env.JAWSDB_URL);
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else {
  // LOCAL DB
  var sequelize = new Sequelize('rutgers_users_db', 'root', '@pril2488');
}

module.exports = sequelize;
