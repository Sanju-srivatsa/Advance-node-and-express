'use strict';
const dotenv = require('dotenv').config()

'$SESSION_SECRET'
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || "my value here",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('view engine','pug')


app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
res.render(process.cwd() + '/views/pug/index', {
  title: 'Hello',
   message: 'Please login'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
