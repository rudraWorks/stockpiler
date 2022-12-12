const {Router} = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.get('/register',authController.register)
router.get('/login',authController.login)
router.post('/register',authController.registerPost)
router.post('/login',authController.loginPost)
router.get('/logout',authController.logout)

module.exports = router

