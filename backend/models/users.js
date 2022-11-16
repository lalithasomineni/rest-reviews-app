const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    "name":{type:String,isrequired: true},
    "password":{type:String,isrequired:true,isunique:true}
})

module.exports = mongoose.model("userSchema",userSchema);