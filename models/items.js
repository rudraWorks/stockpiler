const mongoose = require('mongoose')

const schema = mongoose.Schema({
    itemId : String,
    itemName : String,
    itemPrice : Number,
    itemQuantity : Number,
    itemManufacturer : String,
    itemExpiry : String,
})

module.exports = mongoose.model("Items",schema)