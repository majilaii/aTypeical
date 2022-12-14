import passport, { PassportStatic } from "passport";

import User, {user} from './model/users';
import bcrypt from 'bcrypt';
import { CallbackError } from "mongoose";
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport: PassportStatic) {
  passport.use(
    new localStrategy((username: string, password: string, done: Function) => {
      User.findOne({ username: username }, (err: CallbackError, user: user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, (user as {id:number}).id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err: CallbackError, user: user) => {
      cb(err, user);
    });
  });
};
