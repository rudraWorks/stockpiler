const inventoryController = require('../controllers/inventoryController')
const {Router} = require('express')

const router = Router()

router.get('/dashboard',inventoryController.dashboard)

module.exports = router
