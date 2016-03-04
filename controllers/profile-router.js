var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('../config/passport');
var client = require("../api/yelp.js");
var Review = require('../models/review');
var Sequelize = require('sequelize');
var sequelize = require('../config/connection');

//GET Profile
router.get('/profile/:user', function(req, res) {
  if(!req.user){
    res.redirect('/');
  }
  var name = req.user.id;
  User.findAll({
    where: {
      username: name
    }
  }).then(function(data) {
    console.log(data);
    var user = data;
    res.render('profile', {
      name:name,
      user: user,
      msg: req.query.msg,
      layout: 'yelp-search'
    });
  });
});

//GET Profile
router.post('/profile/:user', function(req, res) {
  var name = req.user.id;
  User = sequelize.define('user', {
     Birthday: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          len:[1, 30]
        }
      },
    }
  ).then(function(data) {
    console.log(data);
    var user = data;
    res.render('profile', {
      user: user,
      msg: req.query.msg,
      layout: 'welcome-layout'
    });
  });
});

module.exports = router;
