const express=require("express");
const app=express();
app.get('/',(req,res)=>{
    res.send("hello from the express")
})
app.get('/about',(req,res)=>{
    res.send("hello from the About")
})
app.get('/contact',(req,res)=>{
    res.send("hello from the Contact")
})
app.listen(7000,()=>{
    console.log("listening the port at 7000")
})