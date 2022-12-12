const mongoose = require('mongoose')

const schema = mongoose.Schema({
    itemId : {
        type:String,
        unique:true,
        requird:true,
    },
    itemName : {
        type:String,
        required:true,
    },
    itemPrice : {
        type:Number,
        required:true,
    },
    itemQuantity : { 
        type:Number,
        required:true,
    },
    itemManufacturer : {
        type:String,
    },
    itemExpiry : {
        type:Date
    },
    itemEntry:{
        type:Date
    }
})

module.exports = mongoose.model("Items",schema)