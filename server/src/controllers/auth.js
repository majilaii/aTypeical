const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('./../model/users');

// TODO rename create to register
const create = async (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw new err();
    if (doc) res.send({ error: '409', message: 'User already exists' });
    if (!doc) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        created: Date.now(),
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

// TODO info below is not used (in the params)
const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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

const profile = async (req, res) => {
  res.send(req.user);
};

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: 'logged out' });
  });
};

module.exports = { create, login, profile, logout };