const express = require ("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const dotEnv = require("dotenv").config();
let Restaurants = require("../models/restaurant");
const app = express();
app.use(express.json());
const multer = require("multer");


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

router.post("/add",upload.single('image'),(req,res)=>{
  let newRestaurant = new Restaurants({
           _id: new mongoose.Types.ObjectId(),
           name: req.body.name,
           rating: req.body.rating,
           location: req.body.location,
           famousCusines: req.body.famousCusines,
           image: req.body.image
  });
  newRestaurant.save().then(result=>{
    res.status(200).json("saved");
  }).catch(err=>{
    res.status(404).json("error");
  })
})
module.exports = router;