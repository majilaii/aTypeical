import passport, { PassportStatic } from "passport";

import User from './model/users';
import bcrypt from 'bcrypt';
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport: PassportStatic) {
  passport.use(
    new localStrategy((username: string, password: string, done: Function) => {
      User.findOne({ username: username }, (err: any, user: any) => {
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

  passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err: any, user: any) => {
      cb(err, user);
    });
  });
};
