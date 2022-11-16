const express = require("express");
const app = express();
const userSchema = require("../models/users");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

app.use(express.json());

/*router.all('*',(req,res)=>{
    res.send("working");
})*/

router.post("/register",(req,res)=>{
    const newUser = new userSchema({
        name: req.body.name,
        password: req.body.password
    });
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        newUser.password = myPlaintextPassword;
    });
    userSchema.find().where({name: req.body.name}).then(user=>{
        if(user.length < 1){
            newUser.save().then(result=>{
                res.json({"message":"user successfully registered"});
            }).catch(err=>{
                res.json({"message":"pls try again later"})
            })
        }
        else{
            res.json({"message":"pls try logging in"})
        }
    })
})

//testing route
router.get("/",(req,res)=>{
    userSchema.find().then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
})

router.post("/login",(req,res)=>{
    res.json({"message":"hi,this is a route for logging in"});
})


module.exports = router;