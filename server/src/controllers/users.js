const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./../model/users');

const create = async (req, res) => {
    console.log(req.body)
    User.findOne({username: req.body.username}, async (err, doc) => {
        if(err) throw new err
        if(doc) res.send('user exists already dum dum')
        if(!doc){
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPass
            })
            await newUser.save()
            res.send('user created').status(201)
        }
    })
  };
  
  const login = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err
        if(!user) res.send('no user exists')
        else {
            req.logIn(user, err => {
                if(err) throw err
                res.status(200).send(user)
            })
        }
    })(req, res, next)
  
};
  
  const profile = async (req, res) => {
    res.send(req.user)
  };
  
  const logout = (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        res.send('logged out')
    })
  };

  const deleteAll = async (req, res) => {
    await User.deleteMany({})
    res.send('deleted all users')
  }
  
  module.exports = { create, login, profile, logout, deleteAll };