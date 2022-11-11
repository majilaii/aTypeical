require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')
const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const router = require('./router')
const app = express()

const corsConfig = {
    // REMOVE-START
    origin: 'http://localhost:3000',
    credentials: true,
    // REMOVE-END
  };

app.use(cors(corsConfig))
app.use(express.json());

app.use(session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'jacky',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  }))

app.use(cookieParser('jacky'))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport);



app.use(router);

app.get('*', (req, res) => {
    res.status(404).send('Sorry, route not found');
  });

app.listen(PORT, ()=> {
  console.log('listening to port 4000')
})