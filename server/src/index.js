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
const {Game} = require("./model/game")
const FetchQuotes = require('./quotesAPI');
const WPMcalc = require('./WPMcalc')




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
let gameTimer;

async function startGameClock(gameID) {
  let timer = 30
  console.log(gameID)
  let game = await Game.findOne({_id: gameID})
  game.startTime = Date.now()
  game = await game.save()
  gameTimer = setInterval(async() => {
    if(timer >= 0) {
      io.to(gameID).emit("gameTimer", {timer, message:"s"})
      timer--
    } else {
      let game = await Game.findOne({_id: gameID})
      let players = game.players
      clearInterval(gameTimer)
      let currentTime = Date.now()
      game.gameOver = true
      players.forEach((el) => {
        if(el.index === 0) {
          el.WPM = 0
        } else {
          el.WPM = WPMcalc(el.index+1, (Number(currentTime) - Number(game.startTime)))}})
      game = await game.save()
      console.log(game)
      io.to((gameID)).emit("gameFinished", game)
     
    }
  }, 1000)
}




io.on("connect", (socket) => {
  let time = 2
  socket.on("gameStart", async({gameID, playerID}) => {
    let game = await Game.findById({_id: gameID})
    let player = game.players.id(playerID)
    if(player.PartyLeader) {
        const timer = setInterval(async() => {
          if(time >= 0) {
            io.to(gameID).emit("timer", {time, message:"Game Starting in "})
            time--
          } else {
            startGameClock(gameID)
            game.roomOpen = false
            game = await game.save()
       
            clearInterval(timer)
          }
        }, 1000)
    
     
  
  }})
  
  socket.on("joinRoom", async({nickname, gameID}) => {
    try{
      let game = await Game.findOne({_id: gameID})
      if(game.roomOpen === true) {
        let Game_id = game._id
        let player = {
          PartyLeader: false,
          socketID:socket.id,
          nickname
        }
        game.players.push(player)
        game = await game.save()
        socket.join(String(Game_id))
        console.log('Joining room ', Game_id)
        io.to(gameID).emit('message', 'joining')
        io.to(gameID).emit("joinGame", game)
      }
    } catch (err) {
      console.log(err)
    }
    
  })


  socket.on("createRoom", async({nickname}) => {
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
       const Game_id = String(game._id);
       console.log('Joining room ', Game_id)
       socket.join(Game_id)
       io.to(Game_id).emit("createdGame", game, Game_id)
    } catch (err) {
      console.log(err)
    }
  })

  socket.on("indexIncrease", async({socketID, textLength, activeWordIndex , gameID}) => {
    try{
      let game = await Game.findOne({_id: gameID})
      let players = game.players
      if(textLength === activeWordIndex) {
        clearInterval(gameTimer)
        let currentTime = Date.now()
        game.gameOver = true
        players.forEach((el) => {
          if(socketID === el.socketID) {
            el.index++
          }
        if(el.index === 0) {
          el.WPM = 0
        } else {
          el.WPM = WPMcalc(el.index+1, (Number(currentTime) - Number(game.startTime)))}}
       )
        game = await game.save()
        io.to((gameID)).emit("gameFinished", game)
      } else {
        game.players = game.players.map((element) => {
          if(element.socketID === socketID) {
            console.log('modifying stuff')
            return {...element, index: element.index+1}
          }
          return element
        })
        game = await game.save()
        io.to(gameID).emit("gameUpdate", game)
      } } catch (err) {
        console.log(err)
      }
    })

  socket.on('disconnect', async() => {
    console.log(socket.id+ "disconnected")

    });


      
   
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