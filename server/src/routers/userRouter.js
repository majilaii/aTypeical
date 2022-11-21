const express = require('express');
const userRouter = express.Router();
const {
  putHistory,
} = require('../controllers/users');

userRouter.post('/update', putHistory);

module.exports = userRouter;
