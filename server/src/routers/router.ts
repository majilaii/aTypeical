import express from 'express';
const router = express.Router();
import authRouter from './authRouter';
import userRouter from './userRouter';

router.use(authRouter);
router.use(userRouter);

module.exports = router;
