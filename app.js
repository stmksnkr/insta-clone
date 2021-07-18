const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT=5000

const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connecte to mongoode yeah!!")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})




require('./models/user')
require('./models/post')


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))







app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})