const express = require('express'); 
const router = express.Router(); 
const auth = require('../auth'); 

const { login, register, dashboard, logout } = require('../controllers/usercontrollers')


router.post('/register', register)
router.post('/login', login)
router.get('/dashboard', auth, dashboard)
router.get('/logout', logout)

module.exports = router; 
