const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

const app = express()

var jsonParser = bodyParser.json()

app.use(cors({

    origin:['https://todo-week11-1.onrender.com', 'http://localhost:3000'],
    methods: ["POST","GET", "PUT", "DELETE"],
    credentials:true
}));

mongoose.connect('mongodb+srv://adline2211:adlinemongo@cluster0.bzz7qxa.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

const Fruit =mongoose.model("Fruit",{name:String},"fruit")

app.get("/",function(req,res){
    res.send("Hi there!")
});

app.get("/fruitlist",function(req,res){
    // res.send("Hi there!")
    Fruit.find().then(function(retdata){
        console.log(retdata)
        res.send(retdata)
    })
    
})

app.post("/addfruit",jsonParser, function(req,res)
{
    console.log(req.body.newfruit)
    var newfruit=req.body.newfruit

    const newFruit = new Fruit({
        name:newfruit
    });

    newFruit.save().then((data)=>{console.log("saveds sucess")
    res.send(data)
    })
});


app.post("/delfruit",jsonParser, function(req,res){
    
    var did=req.body.did
    Fruit.findByIdAndDelete(did).then(function(data){
        res.send(data)
    })
})


app.listen("5001",function(){
    console.log("server started.....")
});