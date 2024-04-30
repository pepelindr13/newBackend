const express = require('express')
const router = express.Router()
const {welcomeUser, about, register, login, registerUser, loginUser,  dashboard, uploadProfile} = require('../Controllers/User.Controller')



router.get('/', welcomeUser)
router.get('/about', about)
router.get('/register', register)
router.get('/login', login)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/dashboard', dashboard)
router.post('/upload', uploadProfile)

module.exports = router;
