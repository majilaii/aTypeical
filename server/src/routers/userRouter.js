const express = require('express');
const userRouter = express.Router();
const {
  deleteAll,
  putHistory,
} = require('../controllers/users');

userRouter.delete('/deleteAll', deleteAll);
userRouter.post('/update', putHistory);

module.exports = userRouter;
