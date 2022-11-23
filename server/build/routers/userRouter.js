"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const userRouter = express_1.default.Router();
userRouter.post('/update', (req, res, next) => {
    console.log('updating');
    console.log(req.body);
    next();
}, users_1.putHistory);
exports.default = userRouter;
