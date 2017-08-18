
const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

let data = {username: 'theironyard', password: 'cohort8'};

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (typeof req.session.username === ''){
    res.redirect('/login/');
  if (typeof req.session.username === data.username && req.session.password === data.password){
    res.redirect('/');
    }
  }
  next();
});
//
// app.use((err, req, res, next) => {
//   res.redirect('/');
// });


app.get('/', (req, res) =>{
  var html = `
    <h1>Greetings</h1>
    <h4>Please login for access:</h4>
    <form action ='/login/' method="post">
    <button type="submit">Login</button>
    </form>
    `;
    res.send(html);
});

app.post('/login/', (req, res) => {
  var html = `
    <marquee behavior="scroll" direction="left">
    <img src="http://www.html.am/images/html-codes/marquees/fish-swimming.gif" alt="Swimming fish">LOGIN DUDE!
    </marquee>
    <h1>App Login:</h1>
    <h4>Please login for access:</h4><br>
    <form action ="/" method="post">
    <input type="text" name="username" placeholder="username" label="Username:"><br><br>
    <input type="password" name="password" placeholder="password" label="password"><br><br>
    <button type="submit">Submit</button>
    </form>
    `;
    // req.checkBody({
    //   'username': {
    //     notEmpty: true,
    //     isLength: {
    //       options: {min: 5},
    //       errorMessage: "Must be at least 5 characters long"
    //     },
    //     errorMessage: 'Invalid Username Length'
    //   },
    //   'password': {
    //     notEmpty: true,
    //     isLength: {
    //       options: {min: 8},
    //       errorMessage: "Must be at least 8 characters long"
    //     },
    //     errorMessage: 'Invalid Password'
    //   }
    // });
    // if (req.body.username === data.username && req.body.password === data.password){
    //       console.log("Success!");
    //       res.redirect('/');
    //   } else {
    //       console.log("Error!");
    //       res.redirect('/login/');
    //   }
    console.log(req.body);
    res.send(html);
});

app.post('/', (req, res) =>{
var html =
  `<h1>Welcome to App</h1>
  <img src="https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif" alt="cat"><br>
  <form action ="/" method="post">
  <button type="logout">Logout</button>
  </form>`
  res.send(html);
});

app.listen(3000, () => console.log('Takin\' Care of Business!!'));

// function loggedIn(req){
//   if (req.body.username === data.username && req.body.password === data.password){
//     console.log(true);
//     return true;
//   } else {
//     return false;
//   }
// }
