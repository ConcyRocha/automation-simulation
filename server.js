const http= require("http")
const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", (req,res)=>{
    res.sendFile(__dirname + "/src/index.html")
    
})
http.createServer (server).listen(4000, () => {
    console.log("servidor rodando em http://localhost:4000")

})

