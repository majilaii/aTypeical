"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const game_1 = __importDefault(require("../model/game"));
const quotesAPI_1 = __importDefault(require("./quotesAPI"));
const WPMcalc_1 = __importDefault(require("./WPMcalc"));
function websocketing(app, corsConfig) {
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, { cors: corsConfig });
    let gameTimer;
    async function startGameClock(gameID) {
        let timer = 30;
        console.log(gameID);
        let game = await game_1.default.findOne({ _id: gameID });
        game.startTime = Date.now();
        game = await game.save();
        gameTimer = setInterval(async () => {
            if (timer >= 0) {
                io.to(gameID).emit('gameTimer', { timer, message: 's' });
                timer--;
            }
            else {
                let game = await game_1.default.findOne({ _id: gameID });
                let players = game.players;
                clearInterval(gameTimer);
                let currentTime = Date.now();
                game.gameOver = true;
                players.forEach((el) => {
                    if (el.index === 0) {
                        el.WPM = 0;
                    }
                    else {
                        el.WPM = (0, WPMcalc_1.default)(el.index + 1, Number(currentTime) - Number(game.startTime));
                    }
                });
                game = await game.save();
                io.to(gameID).emit('gameFinished', game);
            }
        }, 1000);
    }
    io.on('connect', (socket) => {
        let time = 2;
        socket.on('gameStart', async ({ gameID, playerID }) => {
            let game = await game_1.default.findById({ _id: gameID });
            let player = game.players.id(playerID);
            if (player.PartyLeader) {
                const timer = setInterval(async () => {
                    if (time >= 0) {
                        io.to(gameID).emit('timer', { time, message: 'Game Starting in ' });
                        time--;
                    }
                    else {
                        startGameClock(gameID);
                        game.roomOpen = false;
                        game = await game.save();
                        clearInterval(timer);
                    }
                }, 1000);
            }
        });
        socket.on('joinRoom', async ({ nickname, gameID }) => {
            try {
                let game = await game_1.default.findOne({ _id: gameID });
                if (game.roomOpen === true) {
                    let Game_id = game._id;
                    let player = {
                        PartyLeader: false,
                        socketID: socket.id,
                        nickname,
                    };
                    game.players.push(player);
                    game = await game.save();
                    socket.join(String(Game_id));
                    console.log('Joining room ', Game_id);
                    io.to(gameID).emit('message', 'joining');
                    io.to(gameID).emit('joinGame', game);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        socket.on('createRoom', async ({ nickname }) => {
            try {
                const quote = await (0, quotesAPI_1.default)();
                let game = new game_1.default();
                game.words = quote;
                let player = {
                    nickname,
                    PartyLeader: true,
                    socketID: socket.id,
                };
                game.players.push(player);
                game = await game.save();
                const Game_id = String(game._id);
                console.log('Joining room ', Game_id);
                socket.join(Game_id);
                io.to(Game_id).emit('createdGame', game, Game_id);
            }
            catch (err) {
                console.log(err);
            }
        });
        socket.on('indexIncrease', async ({ socketID, textLength, activeWordIndex, gameID }) => {
            try {
                let game = await game_1.default.findOne({ _id: gameID });
                let players = game.players;
                if (textLength === activeWordIndex) {
                    clearInterval(gameTimer);
                    let currentTime = Date.now();
                    game.gameOver = true;
                    players.forEach((el) => {
                        if (socketID === el.socketID) {
                            el.index++;
                        }
                        if (el.index === 0) {
                            el.WPM = 0;
                        }
                        else {
                            el.WPM = (0, WPMcalc_1.default)(el.index + 1, Number(currentTime) - Number(game.startTime));
                        }
                    });
                    game = await game.save();
                    io.to(gameID).emit('gameFinished', game);
                }
                else {
                    game.players = game.players.map((element) => {
                        if (element.socketID === socketID) {
                            console.log('modifying stuff');
                            return { ...element, index: element.index + 1 };
                        }
                        return element;
                    });
                    game = await game.save();
                    io.to(gameID).emit('gameUpdate', game);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        socket.on('disconnect', async () => {
            console.log(socket.id + 'disconnected');
        });
    });
    server.listen(3001, () => {
        console.log('listening on 3001');
    });
}
exports.default = websocketing;
