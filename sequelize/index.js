// var S = require('string');
// const bodyparser = require('body-parser')
// const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./route');
app.use(express.json());
app.use(routes);
// app.use(cors());
// app.use(bodyparser.urlencoded({ extended: false }))
// app.use(bodyparser.json())
const db = require("./dbConfig");
db.db_connection;
// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});


let a = "Qdsa";
//////////////////////////////////////////////////
app.get("/p", (res) => {
  let b = S('my cool string').left(2).endsWith('y');
  console.log(b);
});
///////////////////////////////////////////////////
app.listen(3000, () => console.log('Server is running on port 3000'));


