const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname))

const PORT = 3000

// simple admin login
const ADMIN = {
username: "admin",
password: "1234"
}

// fake database
let orders = []

// login
app.post("/login",(req,res)=>{
if(req.body.username===ADMIN.username && req.body.password===ADMIN.password){
res.json({status:"success"})
}else{
res.json({status:"fail"})
}
})

// create order
app.post("/order",(req,res)=>{
const order = {
ref: "LVR"+Date.now(),
name:req.body.name,
contact:req.body.contact,
status:"Processing"
}

orders.push(order)

res.json(order)
})

// track order
app.get("/track/:ref",(req,res)=>{
const order = orders.find(o=>o.ref===req.params.ref)
res.json(order)
})

app.listen(PORT,()=>{
console.log("LVRWORKNET UKUSA running at http://localhost:3000")
})