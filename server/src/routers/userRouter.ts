import express from 'express';
import {putHistory} from '../controllers/users';
const userRouter = express.Router();

userRouter.post('/update', (req, res, next) => {
    console.log('updating');
    console.log(req.body);
    next();
  }, putHistory);

export default userRouter;
