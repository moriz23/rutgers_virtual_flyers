var sequelize = require("../config/connection.js");
var Sequelize = require('sequelize');
//CREATED REVIEWS TABLE 
var Review = sequelize.define('review', {
 comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Review;