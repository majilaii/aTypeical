import {io} from 'socket.io-client';
const socket = io(process.env.SERVER || 'asdfasdfasdfhttp://localhost:4000');

socket.on('message', (msg: string) => console.log(msg));

export default socket;
