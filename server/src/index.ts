require('dotenv').config();
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
// import router from './routers/router';
const router = require('./routers/router');
import websocketing from './utils/websocket';
const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
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

// TODO: Combine this port with the socket port
// app.listen(PORT, () => {
//   console.log(`listening to port ${PORT}`);
// });
