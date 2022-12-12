const inventoryController = require('../controllers/inventoryController')
const {Router} = require('express')

const router = Router()

router.get('/dashboard',inventoryController.dashboard)
router.post('/addItem',inventoryController.addItem)
router.get('/allItems',inventoryController.allItems)
router.post('/deleteItem',inventoryController.deleteItem)

module.exports = router
