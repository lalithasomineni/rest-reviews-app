const mongoose = require("mongoose");
const schema = mongoose.Schema;


const restaurantSchema = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    "name":{type: String,isrequired: true},
    "rating":{type:Number ,isrequired: true},
    "location": {type: String,isrequired: true},
    "famousCusines":{type: Array,isrequired: true},
    "image":{type: String,isrequired: true}
})


module.exports = mongoose.model("Restaurants",restaurantSchema);