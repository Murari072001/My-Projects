const express=require("express")
const bodyParser=require("body-parser")
const url=require("url")
const fs=require("fs")
const app=express()
const sendmail=require("./routes/email.route")
const cors=require("cors")
let users=JSON.parse(fs.readFileSync("./Users.json"))
let loans=JSON.parse(fs.readFileSync("./Loans.json"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())
app.use("/otp",sendmail)
app.get("/",(req,res)=>{
    res.send(`Server is Running on 4600`,)
})
app.get("/users",(req,res)=>{

    let request=url.parse(req.url,true).query
    let match=users.filter((user)=>user.username===request.username&&user.password===request.password)
    res.json(match)
    
})
app.post("/createNewLoan",(req,res)=>{
    console.log(req.body);
    loans.push(req.body)
    fs.writeFile("./Loans.json",JSON.stringify(loans),(err,result)=>{
        if (err)
        throw err
        res.json(loans)
    })
})

app.get("/allLoans",(req,res)=>{
    res.json(loans)
})
app.get("/loan/:loanId",(req,res)=>{
    console.log(req.params);
    res.json(loans.filter(loan=>loan.accountNumber==req.params.loanId)[0])
})
app.listen(4600,()=>{
    console.log("Server listening on Port 4600");
})