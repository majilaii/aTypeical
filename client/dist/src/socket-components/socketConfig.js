import { io } from 'socket.io-client';
var socket = io('http://localhost:3001');
socket.on('message', function (msg) { return console.log(msg); });
export default socket;
