require('express-async-errors')
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config')


console.log("Db_url", process.env.db_url)
console.log("TrackExpense_jwtPrivateKey", process.env.TrackExpense_jwtPrivateKey)
console.log("ENV", process.env.NODE_ENV)


const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
require("./startup/logging")();
require("./startup/routes")(app);
require('./startup/db')()
require("./startup/config")();


 
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
