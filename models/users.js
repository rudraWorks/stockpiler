const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username:{
        type:String,
        minLength:[5,"username length too short! minimum is 5 chars"],
        maxLength:[25,"username length too long! maximum is 25 chars"],
        unique:true,
    },
    fullname:{
        type:String,
        minLength:[2,"fullname length too short! minimum is 2 chars"],
        maxLength:[25,"fullname length too long! maximum is 25 chars"],
    },
    password:{
        type:String, 
        minLength:[5,"password length too short! minimum is 5 chars"],
        maxLength:[25,"password length too long! maximum is 25 chars"],
    },
    email:{
        type:String,
    },
})


module.exports = mongoose.model("Users",schema)