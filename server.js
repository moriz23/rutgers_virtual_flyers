// Inports all packages
var express           = require('express');
var expressHandlebars = require('express-handlebars');
var session           = require('express-session');
var Sequelize         = require('sequelize');
var app               = express();
var bcrypt            = require('bcryptjs');
var bodyParser        = require('body-parser');
var PORT = process.env.PORT || 8080;

// Connects to database
var sequelize = new Sequelize('rutgers_db', 'root');

// Passport packages
var passport          = require('passport');
var passportLocal     = require('passport-local');