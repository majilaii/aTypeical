import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import User from './../model/users';

const register = async (req: Request, res: Response, next: NextFunction) => {
  // TODO print out those anys and change them maybe?
  User.findOne({ username: req.body.username }, async (err: any, doc: any) => {
    if (err) throw new err();
    if (doc) res.send({ error: '409', message: 'User already exists' });
    if (!doc) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        registerd: Date.now(),
        email: req.body.email,
        username: req.body.username,
        password: hashedPass,
      });
      await newUser.save();
      passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user)
          res.send({
            error: '401',
            message: 'Username or password is incorrect',
          });
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.status(200).send(user);
          });
        }
      })(req, res, next);
    }
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user) => {
    if (err) throw err;
    if (!user)
      res.send({ error: '401', message: 'Username or password is incorrect' });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user).status(200);
      });
    }
  })(req, res, next);
};

const profile = async (req: Request, res: Response) => {
  res.send(req.user);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: 'logged out' });
  });
};

export { register, login, profile, logout };