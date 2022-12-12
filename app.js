const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
// routes
const generalRoutes = require('./routes/generalRoutes')
const authRoutes = require('./routes/authRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')

// model
const itemsModel = require('./models/items')

//middlewares 
const {checkUser} = require('./middlewares/checkUser')

mongoose.set('strictQuery', true);
// const DB = "mongodb://127.0.0.1:27017/inventory"
const DB = process.env.DB
mongoose.connect(DB,()=>{
    console.log("connected to DB")
})

const app = express()
app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(express.json()) 

app.use(checkUser)
app.use(generalRoutes)
app.use(authRoutes)
app.use(inventoryRoutes)

app.get('/',(req,res)=>{
    res.send('hi')
})
 

const port = process.env.PORT || 3000 
app.listen(port,()=>{
    console.log(`connected to port `+port)
})