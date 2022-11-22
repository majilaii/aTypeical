"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.profile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const users_1 = __importDefault(require("./../model/users"));
const register = async (req, res, next) => {
    // TODO print out those anys and change them maybe?
    users_1.default.findOne({ username: req.body.username }, async (err, doc) => {
        if (err)
            throw new err();
        if (doc)
            res.send({ error: '409', message: 'User already exists' });
        if (!doc) {
            const hashedPass = await bcrypt_1.default.hash(req.body.password, 10);
            const newUser = new users_1.default({
                registerd: Date.now(),
                email: req.body.email,
                username: req.body.username,
                password: hashedPass,
            });
            await newUser.save();
            passport_1.default.authenticate('local', (err, user, info) => {
                if (err)
                    throw err;
                if (!user)
                    res.send({
                        error: '401',
                        message: 'Username or password is incorrect',
                    });
                else {
                    req.logIn(user, (err) => {
                        if (err)
                            throw err;
                        res.status(200).send(user);
                    });
                }
            })(req, res, next);
        }
    });
};
exports.register = register;
const login = async (req, res, next) => {
    passport_1.default.authenticate('local', (err, user) => {
        if (err)
            throw err;
        if (!user)
            res.send({ error: '401', message: 'Username or password is incorrect' });
        else {
            req.logIn(user, (err) => {
                if (err)
                    throw err;
                res.send(user).status(200);
            });
        }
    })(req, res, next);
};
exports.login = login;
const profile = async (req, res) => {
    res.send(req.user);
};
exports.profile = profile;
const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send({ message: 'logged out' });
    });
};
exports.logout = logout;
