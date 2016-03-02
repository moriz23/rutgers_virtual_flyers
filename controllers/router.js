var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('../config/passport');
var client = require("../api/yelp.js");

//get routes
router.get('/', function(req, res) {
res.render('registration', {msg: req.query.msg});
});

//ROUTE TO INDEX
router.get('/index', function(req, res){
  res.render('index', {
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

/*********************
     POST ROUTES
*********************/

//CREATES USER TABLE AND SAVES REGISTER INPUT INTO DB
router.post('/save', function(req, res) {
  User.create(req.body).then(function(user){
    req.session.authenticated = user;
    res.redirect('/index');
  }).catch(function(err){
      res.redirect("/?msg=" + err);
      console.log(err);
  });
});

//LOGIN POST LEADS TO INDEX PAGE
router.post('/', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/?msg=Login Credentials do not work'
}));


/*********************
     GET Yelp
*********************/
router.get('/yelp', function(req, res) {
  res.render('yelp', {msg: req.query.msg, layout: 'yelp-layout'});
});

/*********************
     POST Yelp
*********************/
router.post('/yelp', function(req, res) {
  console.log(req.body);
  client.search({
    term: req.body.find,
    location: 'New Brunswick, New Jersey',
    limit: 10
  }).then(function (data) {
    var businesses = data.businesses;

  res.render('yelp', {msg: req.query.msg, layout: 'yelp-layout', results: businesses});
});
});

module.exports = router;
