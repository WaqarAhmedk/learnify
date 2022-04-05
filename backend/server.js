const express=require("express");

const app=express();




app.get("/" ,(req,res)=>{
res.send({
    msg:"sdsdsds"
});
});

app.listen("8080",()=>{
    console.log("Server is up and runing on port 8080");
});