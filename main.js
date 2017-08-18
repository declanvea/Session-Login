
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


















// app.use(morgan('combined'));
//
// let data = {username: 'theironyard', password: 'cohort8'};
//
// app.use((req, res, next) => {
//   if (typeof req.session.username === ''){
//     res.redirect('/login/');
//   if (typeof req.session.username === data.username && req.session.password === data.password){
//     res.redirect('/');
//     }
//   }
//   next();
// });
//
//
//
// app.get('/', (req, res) =>{
//   var html = `
//     <h1>Greetings</h1>
//     <h4>Please login for access:</h4>
//     <form action ='/login/' method="post">
//     <button type="submit">Login</button>
//     </form>
//     `;
//     res.send(html);
// });
//
// app.post('/login/', (req, res) => {
//   // var post = req.body;
//   // if (post.username === 'theironyard' && post.password === 'cohort8') {
//   //   req.session.user_id = theironyard_user_id_here;
//   //   res.redirect('/');
//   // } else {
//   //   res.send('Invalid, please try again');
//   // }
//   var html = `
//     <h1>App Login:</h1>
//     <img src="https://media.giphy.com/media/3owyoUHuSSqDMEzVRu/giphy.gif" alt="Office Space">
//     <h4>"Uh...yeah...I'm gonna need you to login..."</h4><br>
//     <form action ="/" method="post">
//     <input type="text" name="username" placeholder="username" label="Username:"><br><br>
//     <input type="password" name="password" placeholder="password" label="password"><br><br>
//     <button type="submit">Submit</button>
//     </form>
//     `;
//     // req.checkBody({
//     //   'username': {
//     //     notEmpty: true,
//     //     isLength: {
//     //       options: {min: 5},
//     //       errorMessage: "Must be at least 5 characters long"
//     //     },
//     //     errorMessage: 'Invalid Username Length'
//     //   },
//     //   'password': {
//     //     notEmpty: true,
//     //     isLength: {
//     //       options: {min: 8},
//     //       errorMessage: "Must be at least 8 characters long"
//     //     },
//     //     errorMessage: 'Invalid Password'
//     //   }
//     // });
//     // if (req.body.username === data.username && req.body.password === data.password){
//     //       console.log("Success!");
//     //       res.redirect('/');
//     //   } else {
//     //       console.log("Error!");
//     //       res.redirect('/login/');
//     //   }
//     console.log(req.body);
//     res.send(html);
// });
//
// app.post('/', (req, res) =>{
// var html =
//   `
//   <form action ="/" method="get">
//   <button type="logout">Logout</button>
//   </form>
//   <h1>My Stapler App</h1>
//   <img src="https://media.giphy.com/media/3o84U5xPhrn42WgBJC/giphy.gif" alt="Stapler"><br>
//   `
//   res.send(html);
// });
//
// app.listen(3000, () => console.log('Takin\' Care of Business!!'));
//
// // function loggedIn(req){
// //   if (req.body.username === data.username && req.body.password === data.password){
// //     console.log(true);
// //     return true;
// //   } else {
// //     return false;
// //   }
// // }
