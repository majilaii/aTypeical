import express from 'express';
import {putHistory} from '../controllers/users';
const userRouter = express.Router();

userRouter.post('/update', putHistory);

export default userRouter;
