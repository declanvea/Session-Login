
const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

let users = {
  'theironyard': 'cohort8',
  'Coding': 'Developer',
  'Bill': 'Gates',
  'Steve': 'Jobs'
};

app.get('/', (req, res) => {
  let myUser = {};
  myUser.username = req.session.username;
  myUser.password = req.session.password;
  // console.log(req.session.username);
  if(typeof req.session.username !== 'undefined'){
    res.render('index', myUser);
  } else {
    console.log("redirecting to login page");
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login/auth', (req, res) => {
  let name = req.body.username;
  let password = req.body.password;

  if (users[name] === password){
    req.session.username = name;
    req.session.password = password
    res.redirect('/');
  }else {
    res.redirect('/login');
  }
});

app.listen(3000, () => console.log('Hey'));
