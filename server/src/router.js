const express = require('express')
const router = express.Router()
const { create, login, profile, logout, deleteAll, putHistory } = require('./controllers/users')
// const authMiddleware = require('./middlewares/auth');

router.post('/register', create);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);
router.delete('/deleteAll' , deleteAll )
router.get('/update', putHistory)
module.exports = router