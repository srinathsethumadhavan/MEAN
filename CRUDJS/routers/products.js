const express = require('express')
const router = express.Router()
const Product = require('../models/p')


router.get('/', async(req,res) => {
    try{
           const products = await Product.find()
           res.json(products)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const product = await Product.findById(req.params.id)
           res.json(product)
    }catch(err){
        res.status(400).send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    })

    try{
        const a1 =  await product.save() 
        res.status(201).json(a1)
    }catch(err){
        res.send('error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const product = await Product.findById(req.params.id) 
        console.log(product)
        console.log(req.body.price)
        product.price = req.body.price
        console.log(product.price)
        const p1 = await product.save()
        res.json(p1)   
    }catch(err){
        res.send('Error')
    }

 })

 

 router.delete('/:id',async(req,res)=> {
    try{
        const product = await Product.findById(req.params.id) 
       
         await product.remove()
        res.json("success")   
    }catch(err){
        res.send('Error')
    }

 })




 module.exports = router