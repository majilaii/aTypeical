const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

router.use(authRouter);
router.use(userRouter);

module.exports = router;
