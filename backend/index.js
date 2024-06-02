const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose');

const app = express()
app.use(cors({

    origin:['https://todo-week11-client.vercel.app'],
    methods: ["POST","GET"],
    credentials:true
}));

mongoose.connect('mongodb+srv://adline2211:adlinemongo@cluster0.bzz7qxa.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0).then(()=>console.log("DB success")')
.catch(()=>console.log("DB failed"))
const Fruit =mongoose.model("Fruit",{name:String},"fruit")


app.get("/fruitlist",function(req,res){
    // res.send("Hi there!")
    Fruit.find().then(function(retdata){
        console.log(retdata)
        res.send(retdata)
    })
    
})

app.post("/addfruit",function(req,res)
{
    var newfruit=req.body.newfruit

    const newFruit = new Fruit({
        name:newfruit
    });

    newFruit.save().then((data)=>{console.log("saveds sucess")
    res.send(data)})
});


app.post("/delfruit",function(req,res){
    
    var did=req.body.did
    Fruit.findByIdAndDelete(did).then(function(ddata){
        //console.log(ddata)
    })
})


app.listen("5001",function(){
    console.log("server started.....")
});