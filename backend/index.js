const server = require('./app');
const mongoDb = require('mongodb');
mongoDb.MongoClient.connect(process.env.RESTREVIEWS_DB_URI).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})