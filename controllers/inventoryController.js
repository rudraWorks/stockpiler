const itemModel = require('../models/items')

module.exports.dashboard = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.redirect('/login')
    }

    let t = await itemModel.find({username:res.locals.user},{itemPrice:1,itemQuantity:1})
    let totalWorth = 0,totalItems= t.length 
    for(let i=0;i<t.length;++i)
    totalWorth+=t[i].itemPrice*t[i].itemQuantity
    return res.render('inventory/dashboard',{totalItems,totalWorth})
}

module.exports.addItem = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.json({success:false,message:"user auth failed"})
    }
    let {itemId,itemName,itemPrice,itemQuantity,itemManufacturer,itemExpiry,itemEntry} = req.body 
    
    if(!itemId || !itemName || !itemPrice || !itemQuantity || !itemManufacturer || !itemExpiry || !itemEntry) return res.json({success:false,message:"input fields can't be empty!"})

    if(itemPrice<=0)
    return res.json({success:false,message:"invalid item price!"})

    if(itemQuantity<=0)
    return res.json({success:false,message:"invalid item quantity"})

    try{
        await itemModel.create({username:res.locals.user,itemId,itemName,itemPrice,itemQuantity,itemManufacturer,itemExpiry,itemEntry})
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
    let t = await itemModel.find({username:res.locals.user})
    let sum=0
    for(let i=0;i<t.length;++i)sum+=t[i].itemPrice
    res.render('inventory/allItems',{allItems:t,totalWorth:sum})
}

module.exports.deleteItem = async (req,res) =>{
    if(!res.locals.isAuthenticated){
        return res.json({success:false,message:"user auth failed"})
    }
    let {id}=req.body 
    let t = await itemModel.findOneAndDelete({_id:id},{new:true})
    return res.json({success:true,message:"item successfully deleted"})
}