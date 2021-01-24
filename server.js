const http= require("http")
const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", (req,res)=>{
    res.sendFile(__dirname + "/src/index.html")
    
})
server.get("/src/index_2.html", (req,res)=>{
    res.sendFile(__dirname + "/src/index_2.html")
    
})
const PORT = process.env.PORT|| 4000;
server.listen(PORT,() =>{
    console.log("listening on port" + PORT);
})
