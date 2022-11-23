"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
// import router from './routers/router';
const router = require('./routers/router');
const websocket_1 = __importDefault(require("./utils/websocket"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    maxAge: 3600,
};
app.use((0, cors_1.default)(corsConfig));
(0, websocket_1.default)(app, corsConfig);
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log('updating');
    console.log(req.body);
    next();
});
app.use((0, express_session_1.default)({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET_KEY || 'secret thing',
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        secure: false,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
require('./passportConfig')(passport_1.default);
app.use(router);
app.get('*', (req, res) => {
    res.status(404).send('Sorry, route not found');
});
// TODO: Combine this port with the socket port
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
