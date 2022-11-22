require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET_KEY,
  DB: process.env.RESTREVIEWS_DB_URI
};