require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')
const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const router = require('./router')
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const Game = require("./model/game")
const FetchQuotes = require('./quotesAPI')





const corsConfig = {
    // REMOVE-START
    origin: 'http://localhost:3000',
    origin:true,
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
    maxAge: 3600,
  };

app.use(cors(corsConfig))

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods:["GET, POST"]
  }
})

io.on("connect", (socket) => {
  socket.emit("test", "youre a cunt lol")
  socket.on("createRoom", async(nickname) => {
    try{
      const quote = await FetchQuotes()
      let game = new Game()
      game.words = quote
      let player = {
        nickname,
        PartyLeader: true,
        socketID: socket.id
      }
      game.players.push(player)
       game = await game.save()
       const Game_id = game._id
       socket.join(Game_id)
       io.to(Game_id).emit("createdGame", game)
    } catch (err) {
      console.log(err)
    }
  })
})


server.listen(3001, () => {
  console.log('listening on 3001')
})




// ------------------------------------------------------------------------------------------------------

app.use(express.json());

app.use(session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  }))

app.use(cookieParser(process.env.SECRET_KEY))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport);



app.use(router);

app.get('*', (req, res) => {
    res.status(404).send('Sorry, route not found');
  });

app.listen(PORT, ()=> {
  console.log('listening to port 4000')
})