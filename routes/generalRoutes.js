const generalController = require('../controllers/generalController')
const {Router} = require('express')

const router = Router()

router.get('/',generalController.home)
router.get('/about',generalController.about)

module.exports = router
