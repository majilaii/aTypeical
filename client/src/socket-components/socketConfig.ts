import {io} from 'socket.io-client';
const socket = io('http://localhost:3001');

socket.on('message', (msg: string) => console.log(msg));

export default socket;
