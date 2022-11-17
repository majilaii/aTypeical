const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
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

const putHistory = async (req, res) => {
  ({ wordAmount, KEnglish, typingMode, date } = req.body);
  const time = req.body.speed / 1000;
  const incorrects = req.body.incorrect;
  const textLength = req.body.text;
  const wpm = Math.round((textLength - incorrects) / 5 / (time / 60));
  const accuracy = (100 * (textLength - incorrects)) / textLength;
  const rawWPM = Math.round(textLength / 5 / (time / 60));
  await User.findByIdAndUpdate(
    req.user._id,

    {
      $push: {
        history: {
          $each: [
            // TODO remove $each
            {
              date,
              wpm: wpm,
              rawwpm: rawWPM,
              textLength: textLength,
              incorrect: incorrects,
              accuracy: accuracy,
              time: time,
              wordAmount,
              KEnglish,
              typingMode,
            },
          ],
          $position: 0,
        },
      },
    },
    { new: true }
  );

  res.sendStatus(201);
};

// TODO use just in Postman
const deleteAll = async (req, res) => {
  await User.deleteMany({});
  res.send('deleted all users');
};

module.exports = { create, login, profile, logout, deleteAll, putHistory };
