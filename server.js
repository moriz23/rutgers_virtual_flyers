//NPM PACKAGES INSTALLED
var express = require('express');
var expressHandlebars = require('express-handlebars');
var session = require('express-session');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var app = express();

//format
var sequelize = require('./config/connection');
var passport = require('./config/passport');
var User = require('./models/user');



var PORT = process.env.PORT || 8070;

//Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static(__dirname + "/public"));

//PUBLIC FOLDER
app.use(express.static('public'));//this looks up the public folder, which contains the css folder and the styles.css file don't need to specify the actual file, because it will read all files inside the public folder

//SETTING DEFAULT LAYOUT TO MAIN.HANDLEBARS
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));

//SETTING VIEW TO ALL HANDLEBAR PAGES
app.set('view engine', 'handlebars');

//BODYPARSER TO READ HTML
app.use(bodyParser.urlencoded({
  extended: false
}));

//CREATE SECRET FOR USER LOGIN
app.use(session({
  secret: 'this is a secret',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60
  },
  saveUninitialized: true,
  resave: true
}));

//PASSPORT initialize
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
var routes = require('./controllers/router.js');
var yelps = require('./controllers/yelp-router.js');
var profile = require('./controllers/profile-router.js');
app.use('/', routes);
app.use('/', yelps);
app.use('/', profile);


sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on PORT %s", PORT);
  });
});
