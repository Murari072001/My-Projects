const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const otpGenerator = require('otp-generator')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET","PUT","DELETE"],
    credentials: true
}))
let users = JSON.parse(fs.readFileSync("./Server/Database/Users.json").toString());
let CompanyDetails = fs.readFileSync("./Server/Database/CompanyDetails.json").toString();
let totalData = JSON.parse(fs.readFileSync("./Server/Database/TotalData.json").toString());
setInterval(() => {
    if (new Date().getSeconds() === 0) {
        let MM = new Date().getMonth()
        let YYYY = new Date().getFullYear()
        let DD = new Date().getDate()
        let x = 1;
        if (new Date().getDay() === 0) {
            x = 2
        }
        if (new Date().getDay() === 1) {
            x = 3
        }
        let fun = users.map((user) => {
            user.Allstocks.map((stock) => {
                if (stock.status === "pending") {
                    // console.log("pending",stock);
                    totalData.filter(company => company.symbol === stock.company)[0].values.map((value) => {
                        if (new Date(value.datetime) > new Date(YYYY, MM, DD - x)&&new Date(value.datetime).getTime() <= new Date().getTime() - 86400000 && value.close == stock.amount) {
                            stock.status = "done"
                            if (stock.type === "sell") {
                                user.wallet += (stock.amount * stock.stocks)
                            }
                        }
                    })
                }
                return { ...stock, "time": new Date().getTime() - 86400000 }
            })
            return user
        })
        // console.log("Server",JSON.stringify(fun))
        fs.writeFileSync("./Server/Database/Users.json", JSON.stringify(fun))
    }
}, 1000)

function checkLogin(req, res, next) {
    console.log("called");
    if (req.cookies.token) {
        let verify = jwt.verify(req.cookies.token, "security-token")
        let user = users.filter((ele) => ele.username === verify.username && ele.password === verify.password)
        res.send({ user: user[0], Login: true })
    }
    else
        next()
}
app.get("/", checkLogin, (req, res) => {
    console.log("Called");
    res.send({ Login: false, "message": "Server Running On Port 4600" })
})

app.post("/authenticate", (req, res) => {
    let filtered = users.filter((ele) => ele.username === req.body.username && ele.password === req.body.password)
    if (filtered.length) {
        res.cookie("token", jwt.sign(req.body, "security-token"))
        // res.cookie("name","hello")
    }
    res.send({ user: filtered, Login: true })
})

app.get("/allCompanies", (req, res) => {
    res.send(CompanyDetails)
})

app.post("/purchase", (req, res) => {
    let verify = jwt.verify(req.cookies.token, "security-token")
    let updated = users.map((user) => {
        if (user.username === verify.username && user.password === verify.password) {
            if(totalData.filter(ele => ele.symbol === req.body.company)[0].values.filter((value) => new Date(value.datetime) > new Date(2024, 3, 11)&&new Date(value.datetime).getTime() <= new Date().getTime() - 86400000 && value.close == req.body.amount)[0])
            {
                req.body={...req.body,"status":"done"}
            }
            user.Allstocks.push({...req.body,"id":otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false })})
            if(req.body.type==="buy")
            {
                user.wallet-=(req.body.stocks*req.body.amount)
            }
            console.log();
        }
        return user
    })
    // console.log(updated);
    fs.writeFileSync("./Server/Database/Users.json", JSON.stringify(updated))
    res.send("SuccessFul")
})

app.get("/:cname", (req, res) => {

    res.send(totalData.filter((a) => a.symbol === req.params.cname))
})
app.put("/updateStock",(req,res)=>{
    let verify = jwt.verify(req.cookies.token, "security-token")
     let updated=users.map((user)=>{
        if (user.username === verify.username && user.password === verify.password)
        {
            user.Allstocks.map((stock)=>{
                if(stock.id===req.body.id)
                {
                    stock.stocks=req.body.stocks
                    stock.amount=req.body.amount
                }
                return stock
            })
        }
        return user
     })
    fs.writeFileSync("./Server/Database/Users.json", JSON.stringify(updated))
     res.send(users.filter(user=>user.username === verify.username && user.password === verify.password))

})

app.delete("/deleteStock/:cid",(req,res)=>{
    let verify = jwt.verify(req.cookies.token, "security-token")
     let updated=users.map((user)=>{
        if (user.username === verify.username && user.password === verify.password)
        {
            user.Allstocks=user.Allstocks.filter((stock)=>stock.id!==req.params.cid)
        }
        return user
     })
    fs.writeFileSync("./Server/Database/Users.json", JSON.stringify(updated))
     res.send(users.filter(user=>user.username === verify.username && user.password === verify.password))
})


app.post("/logout", (req, res) => {
    res.clearCookie("token").send({ Login: false })
})
app.listen(4600, () => { console.log("Server is Running on 4600 Port"); })