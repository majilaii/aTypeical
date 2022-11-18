require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const passportLocal = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
const router = require('./routers/router');
const app = express();
const websocketing = require('./utils/websocket');

const corsConfig = {
  origin: 'http://localhost:3000',
  origin: true,
  methods: 'GET, POST, PUT, DELETE, PATCH', // TODO PATCH - ??!?
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsConfig));

websocketing(app);

app.use(express.json());

app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET_KEY || 'secret thing',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(cookieParser(process.env.SECRET_KEY)); // TODO: Check if needed
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, route not found');
});

// TODO we could replace app.listen with server.listen
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
