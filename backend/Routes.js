const { request } = require("express");
const express=require("express");
const router=express.Router();
const signuptmp=require("../backend/Models/SignupModel");


router.post("/signu" ,(req,res)=>{
   const signedupUser=new signuptmp({
       fname:req.body.fname,
       lname:req.body.lname,
       email:req.body.email,
       password:req.body.password,
       imagepath:req.body.imagepath,

   });

   signedupUser.save().then((result) => {
       res.json(result);
   }).catch((err) => {
       res.json(err);
   });;
});



module.exports =router;