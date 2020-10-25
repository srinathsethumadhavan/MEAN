const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const url = "mongodb://localhost/mydb"
const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())
app.use(cors({orgin: 'http://localhost:4200' }))
const productRouter = require('./routers/products')
app.use('/products',productRouter)

app.listen(9000, () => {
    console.log('Server started')
})