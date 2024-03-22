const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const fs = require('fs')
const url = require('url')
// const todos=require('./database/todos')
var todos = JSON.parse(fs.readFileSync("./database/todos.json"))

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.get("/alltodos", (req, res) => {
    res.json(todos)
})

app.post("/addTodo", (req, res) => {
    todos.push({ "title": req.body.newTodo, "status": false })
    fs.writeFile("./database/todos.json", JSON.stringify(todos), (err) => {
        if (err)
            throw err
    })
    res.json(todos)
})
app.put("/update", (req, res) => {
    console.log(req.body);
    if (req.body.type === "status") {
        todos = todos.map((todo) => {
            if (todo.title === req.body.index)
                todo.status = !todo.status
            return todo
        })
        console.log(todos);

    }
    if (req.body.type === "update") {
        todos[req.body.index].title = req.body.title
    }
    fs.writeFile("./database/todos.json", JSON.stringify(todos), (err) => {
        if (err)
            throw err
    })
    res.json(todos)
})
app.delete("/delete/:index", (req, res) => {
    console.log(req.params);
    todos.splice(req.params.index, 1)
    fs.writeFile("./database/todos.json", JSON.stringify(todos), (err) => {
        if (err)
            throw err
    })
    res.json(todos)
})
app.listen(4600, () => { console.log("Server Running on 4600"); })