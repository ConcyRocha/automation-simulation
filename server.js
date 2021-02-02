const http= require("http")
const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", function(req,res){
    res.sendFile(__dirname + "/src/index.html")
    
})
server.get("/sala",function(req,res){
    res.sendFile(__dirname + "/src/sala.html")
    
})
server.get("/sumario",function(req,res){
    res.sendFile(__dirname + "/src/sumario.html")
    
})
server.get("/conceito_domotica",function(req,res){
    res.sendFile(__dirname + "/src/conceito_domotica.html")
    
})
const PORT = process.env.PORT|| 4000;
server.listen(PORT,() =>{
    console.log("listening on port" + PORT);
})
