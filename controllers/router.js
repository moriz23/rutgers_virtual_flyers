var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('../config/passport');
var client = require("../api/yelp.js");
var Review = require('../models/review');


//GET Route signin/register
router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/welcome');
    return;
  }
  res.render('registration', {
    msg: req.query.msg
  });
});

//ROUTE TO Welcome/Logged in
router.get('/welcome', function(req, res) {
  if (!req.user) {
    res.redirect('/');
    return;
  }
  var username = req.user.id;
  res.render('welcome', {
    user: username,
    isAuthenticated: req.isAuthenticated(),
    name: username,
    layout: 'welcome-layout'
  });
});

//GET Log Out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//GET Log Out
router.get('/profile/:user', function(req, res) {
  res.send('yay!');
});

//GETTING USER REVIEWS INPUT
// router.get('/reviews', function(req, res) {
//   Review.findAll().then(function(reviews) {
//     res.render('yelp-business', {
//       user: req.user,
//       isAuthenticated: req.isAuthenticated(),
//       reviews: reviews
//     });
//   });
// });

/*********************
     POST ROUTES
*********************/

//CREATES USER TABLE AND SAVES REGISTER INPUT INTO DB
router.post('/save', function(req, res) {
  User.create(req.body).then(function(user) {
    req.session.authenticated = user;
    res.redirect('/welcome');
  }).catch(function(err) {
    res.redirect("/?msg=" + err);
    console.log(err);
  });
});

//LOGIN POST LEADS TO welcome PAGE
router.post('/', passport.authenticate('local', {
  successRedirect: '/welcome',
  failureRedirect: '/?msg=Login Credentials do not work'
}));

//REVIEWS POST
router.post('/reviews', function(req, res) {

  Review.create(req.body).then(function(review) {
    var comment = req.body.comment;
    console.log(comment);
    req.session.authenticated = review;
    res.redirect(url);
  }).catch(function(err) {
    res.redirect("/?msg=" + err);
    console.log(err);
  });
});



module.exports = router;
