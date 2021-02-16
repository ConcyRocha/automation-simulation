const http= require("http")
const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", function(req,res){
    res.sendFile(__dirname + "/src/index.html")
    
})
server.get("/simulador",function(req,res){
    res.sendFile(__dirname + "/home-automation-simulation-v1.0/index2.html")
    
})
server.get("/Sumario",function(req,res){
    res.sendFile(__dirname + "/src/Sumario.html")
    
})
server.get("/conceito_domotica",function(req,res){
    res.sendFile(__dirname + "/src/conceito_domotica.html")
    
})
server.get("/tela05",function(req,res){
    res.sendFile(__dirname + "/src/tela05.html")
    
})
server.get("/tela06",function(req,res){
    res.sendFile(__dirname + "/src/tela06.html")
    
})
const PORT = process.env.PORT|| 4000;
server.listen(PORT,() =>{
    console.log("listening on port" + PORT);
})
