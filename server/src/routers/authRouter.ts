import express from 'express';
import { register, login, profile, logout } from '../controllers/auth';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', profile);
authRouter.post('/logout', logout);

export default authRouter;
