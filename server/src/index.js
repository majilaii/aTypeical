require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const router = require('./routers/router');
const app = express();
const websocketing = require('./utils/websocket');

const corsConfig = {
  origin: 'http://localhost:3000',
  origin: true,
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsConfig));

websocketing(app, corsConfig);

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

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, route not found');
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
