const express = require ("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const dotEnv = require("dotenv").config();
let Restaurants = require("../models/restaurant");
const app = express();
app.use(express.json());
const multer = require("multer");
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const userschema = require("../models/users");
const Passport = require("../middlewares/passport");






var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage })

router.get("/",(req,res)=>{
    Restaurants.find().then(result=>{
        res.json({"restaurants":result})
        console.log(result)
    }).catch(err=>{
        res.json(err);
    })
})

router.get("/restaurant",(req,res)=>{
  Restaurants.find().where({name: req.params.name}).then(result=>{
      res.json({"restaurant":result})
  }).catch(err=>{
      res.json(err);
  })
})

router.post("/add",auth,upload.single('image'),async (req,res)=>{
  let newRestaurant = new Restaurants({
           _id: new mongoose.Types.ObjectId,
           name: req.body.name,
           rating: req.body.rating,
           location: req.body.location,
           famousCusines: req.body.famousCusines,
           image: req.body.image,
           user:req.body.user
  });
    Restaurants.find({name: req.body.name}).then(resta=>{
    if(resta.length >= 1){
      res.send("already exists")
  }else{
    newRestaurant.save().then(result=>{
      res.status(200).json(result);
      }).catch(err=>{
    res.status(500).json("error");
 })
      }
})
})



router.put("/update/:id",auth,upload.single('image'),async (req,res)=>{
  try{
 const updatedResto = await Restaurants.findByIdAndUpdate(req.body._id,{
  $set:req.body,
 },{new: true}
 )
 res.json(updatedResto); 
}
catch(err){
 res.json(err);
} 
})

router.delete("/delete",auth,(req,res)=>{
Restaurants.deleteOne({name: req.params.name}).then(result=>{
  res.json({"result": result})
}).catch(err=>{
  res.json(err)
})
})
module.exports = router;