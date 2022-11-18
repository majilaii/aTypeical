const express = require('express');
const authRouter = express.Router();
const {
  create,
  login,
  profile,
  logout,
} = require('../controllers/auth');

authRouter.post('/register', create);
authRouter.post('/login', login);
authRouter.get('/profile', profile);
authRouter.post('/logout', logout);

module.exports = authRouter;
