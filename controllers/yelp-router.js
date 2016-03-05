var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('../config/passport');
var client = require("../api/yelp.js");
var Review = require('../models/review');

/*********************
     GET Yelp
*********************/
router.get('/yelp', function(req, res) {
  if (!req.user) {
    res.render('yelp', {
      msg: req.query.msg,
      layout: 'yelp-search'
    });
  } else {
    var name = req.user.id;
    res.render('yelp', {
      name: name,
      msg: req.query.msg,
      layout: 'yelp-search'
    });
  }
});

/*********************
  GET Business Info
*********************/
router.get('/business/:business', function(req, res) {
  if (!req.user) {
    client.business(business, {
      cc: "US"
    }).then(function(data) {
      //console.log(data);

      res.render('yelp-business', {
        msg: req.query.msg,
        layout: 'yelp-business',
        info: data
      });
    });
  }
  var business = req.params.business;
  client.business(business, {
    cc: "US"
  }).then(function(data) {
    var name = req.user.id;

    res.render('yelp-business', {
      name: name,
      msg: req.query.msg,
      layout: 'yelp-business',
      info: data
    });
  });
});

/*********************
   POST Yelp Search
*********************/
router.post('/yelp', function(req, res) {
  if (!req.user) { //non user
    client.search({
      term: req.body.find,
      location: 'New Brunswick, New Jersey',
      limit: 10
    }).then(function(data) {
      var businesses = data.businesses;
      res.render('yelp', {
        msg: req.query.msg,
        layout: 'yelp-search',
        results: businesses
      });
    });
  }
  client.search({
    term: req.body.find,
    location: 'New Brunswick, New Jersey',
    limit: 10
  }).then(function(data) {
    var businesses = data.businesses;
    var name = req.user.id;
    res.render('yelp', {
      name: name,
      msg: req.query.msg,
      layout: 'yelp-search',
      results: businesses
    });
  });
});

module.exports = router;
