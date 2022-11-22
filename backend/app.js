const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoDb = require('mongodb');
require('dotenv').config();
app.use(express.json());
const restaurantsRoute = require("./routes/restaurantController")
const mongoose = require("mongoose");
const mongodburl = process.env.RESTREVIEWS_DB_URI;
const userRoute = require("./routes/user");



app.use(express.urlencoded({ extended: false }));





mongoose
  .connect(mongodburl)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));



//routes
app.use('/api/v1/restaurants',restaurantsRoute);
app.use('/api/v1/users',userRoute);


app.all('*',(req,res)=>{
    res.status(404).json("data not found")
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})