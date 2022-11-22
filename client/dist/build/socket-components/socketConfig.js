"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)('http://localhost:3001');
socket.on('message', function (msg) { return console.log(msg); });
exports.default = socket;
