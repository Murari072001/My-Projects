const express=require("express")
const bodyParser=require("body-parser")
const url=require("url")
const fs=require("fs")
const app=express()
const users=require("./Users")
const cors=require("cors")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Server is Running on 4600")
})
app.get("/users",(req,res)=>{

    let request=url.parse(req.url,true).query
    let match=users.users.filter((user)=>user.username===request.username&&user.password===request.password)
    console.log(match);
    res.json(match)
    
})
app.post("/createNewLoan",(req,res)=>{
    console.log(req.body);
    
})
app.listen(4600,()=>{
    console.log("Server listening on Port 4600");
})