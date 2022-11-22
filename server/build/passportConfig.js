"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./model/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const localStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
    passport.use(new localStrategy((username, password, done) => {
        users_1.default.findOne({ username: username }, (err, user) => {
            if (err)
                throw err;
            if (!user)
                return done(null, false);
            bcrypt_1.default.compare(password, user.password, (err, result) => {
                if (err)
                    throw err;
                if (result === true) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        });
    }));
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        users_1.default.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
