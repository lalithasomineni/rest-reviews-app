const express = require("express");
const app = express();
const userSchema = require("../models/users");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { Await } = require("react-router");
require("dotenv").config();
const mongoose = require("mongoose")

app.use(express.json());

/*router.all('*',(req,res)=>{
    res.send("working");
})*/

router.post("/register",async (req,res)=>{
    const newUser = new userSchema({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(14)
    newUser.password =  await bcrypt.hash(newUser.password,salt);
    userSchema.find().where({name: req.body.name}).then(user=>{
        if(user.length < 1){
            newUser.save();
            res.send("saved")
        }
        else{
            res.json({"message":"pls try logging in"})
        }
    })
})

//testing route
router.get("/",auth,(req,res)=>{
    userSchema.find().then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})

router.get("/id",auth,(req,res)=>{
    userSchema.findById(_id = req.body._id).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    })
})
//{"name":"raana","password":"red"}
router.post("/login", (req,res)=>{
    userSchema.find().where({name:req.body.name}).then(user=>{
        if(user.length < 1){
            res.json({"message":"please try registration route"})
        }
        else{
            //let hash = user.password;
             bcrypt.compare(req.body.password, user[0].password,(err, result)=> {
                if(result){
                    //res.json("logged in");
                    const accessToken = jwt.sign(user[0].toObject(),process.env.SECRET_KEY, {expiresIn: "7 days"})
                    res.json({"accesstoken": accessToken})
                }
                else{
                    res.send("passwords does not match");
                }
            });
        }
            })
        })

        
          


module.exports = router;





/*{
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdjNzk2ZGU2NmJjYzVmMWE3ODc2OGQiLCJuYW1lIjoicm9obiIsInBhc3N3b3JkIjoiJDJiJDE0JGFxNC54SnoubVBqT0dRdjhKNngubi5LT21MNWQuTi5CVHM5ZHg4aG9vS004MTVDWFB2dUg2IiwiX192IjowLCJpYXQiOjE2NjkxMDIwNDIsImV4cCI6MTY2OTcwNjg0Mn0.yZKMO_E0FjgRL4NyTaP6wndb6ViYNg55xfRE5_DcpA0"
}
rohnid 637c796de66bcc5f1a78768d
resstid 637c7ac0eb00aced15667339*/