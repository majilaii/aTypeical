const express = require('express');
const router = express.Router();
const {
  create,
  login,
  profile,
  logout,
  deleteAll,
  putHistory,
} = require('./controllers/users');

// TODO split authRouter into a separate file. Add a new controller for Auth.
// const authMiddleware = require('./middlewares/auth');

router.post('/register', create);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

router.delete('/deleteAll', deleteAll);
router.post('/update', putHistory);

module.exports = router;
