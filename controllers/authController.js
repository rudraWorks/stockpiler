const userModel = require('../models/users')
const jwt = require('jsonwebtoken')

let maxAge = 1000*60*60*24*5 // 5 days 
let createToken = (id) =>{
    return jwt.sign({id},'srudra754',{expiresIn:maxAge})
}

module.exports.register = async (req,res)=>{
    if(res.locals.isAuthenticated){
        return res.redirect('/')
    }
    res.render('auth/register')
}

module.exports.login = async (req,res) =>{
    if(res.locals.isAuthenticated){
        return res.redirect('/')
    }
    res.render('auth/login')
}

module.exports.registerPost = async (req,res) =>{
    if(res.locals.isAuthenticated){
        return res.json({success:false,message:"already registered"})
    }

    let {username,fullname,password,email} = req.body 
    if(username=="" || fullname=="" || password=="" || email=="")
    return res.json({success:false,message:"input fields can't be empty!"})

    try{
        let t =await userModel.create({username,fullname,password,email})
        res.cookie('stockpiler',createToken(t.username),{httpOnly:true,maxAge:maxAge})
    }
    catch(e){
        if(e.message.includes('E11000'))e.message="This username is already in use, try a new one!"
        return res.json({success:false,message:e.message})
    }

    res.json({success:true,message:"good"})
}


module.exports.loginPost = async (req,res) =>{
    if(res.locals.isAuthenticated){
        return res.json({success:false,message:"already loggedin"})
    }

    let {username,password} = req.body 
    if(username=="" || password=="")
    return res.json({success:false,message:"input fields can't be empty!"})

    try{
        let t =await userModel.findOne({username})
        if(t){
            if(t.password==password){
                res.cookie('stockpiler',createToken(t.username),{httpOnly:true,maxAge:maxAge})
                return res.json({success:true,message:"successfully logged in"})
            }
            else{
                return res.json({success:false,message:"incorrect password"})
            }
        }
        else{
            return res.json({success:false,message:"this username is not registered!"})
        }
    }
    catch(e){
        return res.json({success:false,message:e.message})
    }

}

module.exports.logout = (req,res) =>{
    res.cookie('stockpiler','',{httpOnly:true,maxAge:1})
    return res.redirect('/')
}