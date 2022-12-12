const { findOneAndUpdate, findOneAndDelete } = require('../models/items')
const itemModel = require('../models/items')

module.exports.dashboard = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.redirect('/login')
    }
    return res.render('inventory/dashboard')
}

module.exports.addItem = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.json({success:false,message:"user auth failed"})
    }
    let {itemId,itemName,itemPrice,itemQuantity,itemManufacturer,itemExpiry,itemEntry} = req.body 
    
    if(!itemId || !itemName || !itemPrice || !itemQuantity || !itemManufacturer || !itemExpiry || !itemEntry) return res.json({success:false,message:"input fields can't be empty!"})

    try{
        await itemModel.create({itemId,itemName,itemPrice,itemQuantity,itemManufacturer,itemExpiry,itemEntry})
        return res.json({success:true})
    }
    catch(e){
        return res.json({success:false,message:e.message})
    }
    res.json({success:true})
}

module.exports.allItems = async (req,res)=>{
    if(!res.locals.isAuthenticated){
        return res.redirect('/login')
    }
    let t = await itemModel.find({})
    res.render('inventory/allItems',{allItems:t})
}

module.exports.deleteItem = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.json({success:false,message:"user auth failed"})
    }
    let {id}=req.body 
    let t = await itemModel.findOneAndDelete({_id:id},{new:true})
    return res.json({success:true,message:"item successfully deleted"})
}