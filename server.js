//NPM PACKAGES INSTALLED
var express           = require('express');
var expressHandlebars = require('express-handlebars');
var session           = require('express-session');
var Sequelize         = require('sequelize');
var passport          = require('passport');
var passportLocal     = require('passport-local');
var bcrypt            = require('bcryptjs');
var bodyParser        = require('body-parser');
var app               = express();
var PORT = process.env.PORT || 8070;

//CONNECTS TO DATABASE
var sequelize = new Sequelize('l3855uft9zao23e2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', 'slp8h1ua32q5t52m', 'fd41izpn61lizyyc');

var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

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
  cookie:{
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  saveUninitialized: true,
  resave: false
}));

/*********************
     PASSPORT
*********************/

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, { id: id, username: id })
});

passport.use(new passportLocal.Strategy(
  function(username, password, done) {
    //Check passwood in DB
    User.findOne({
      where:{
        username: username
      }
    }).then(function(user){
      //check password against hash
      if(user){
        bcrypt.compare(password, user.dataValues.password, function(err, user){
          if(user){
            //if password is correcnt authenticate the user with cookie
            done(null, {id: username, username:username});
          } else{
            done(null,false);
          }
        });
      }else {
        done(null, null);
      }
    });
  }));

/*********************
     TABLE
*********************/

//Creating student table in student_instructor_db
var User = sequelize.define('user', {
   username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len:[1, 30]
      }
    },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5,10]
      }
    }
  }
}, {
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
});

/*********************
     GET ROUTES
*********************/

//HOMEPAGE IS LOGIN
app.get('/', function(req, res) {
  res.render('login', {msg: req.query.msg});
});

//ROUTE TO REGISTER
app.get('/need_register', function(req, res) {
  res.render('register', {msg: req.query.msg});
});

//ROUTE TO LOGIN
app.get('/already_sign_up', function(req, res) {
  res.render('login', {msg: req.query.msg});
});

/*********************
     POST ROUTES
*********************/

//creates user table and puts input into that table from user register
app.post('/save', function(req, res) {
  User.create(req.body).then(function(user){
    req.session.authenticated = user;
    res.redirect('/login');
  }).catch(function(err){
      res.redirect("/?msg=" + err.errors[0].message);
      console.log(err);
  });
});

//login post leads user to main page
app.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/?msg=Login Credentials do not work'
}));

//sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on PORT %s", PORT);
  });
//});