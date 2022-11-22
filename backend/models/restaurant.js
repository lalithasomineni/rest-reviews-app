const mongoose = require("mongoose");
const schema = mongoose.Schema;
//const userSchema = require("./users");


const restaurantSchema = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    "name":{type: String,isrequired: true},
    "rating":{type:Number ,isrequired: true},
    "location": {type: String,isrequired: true},
    "famousCusines":{type: Array,isrequired: true},
    "image":{type: String,isrequired: true},
     "user": {type: mongoose.Schema.Types.ObjectId,ref: 'userSchema',required: true},
   
})


module.exports = mongoose.model("Restaurants",restaurantSchema);