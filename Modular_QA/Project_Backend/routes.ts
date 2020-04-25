const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
require('dotenv').config();
const port = 3000;
var request = require('request');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/table_attributes', db.getTable_attributes);

app.get('/table_with_attributes', db.getTable_with_attributes);

app.get('/get_query', db.getquery);

// app.get('/getquery', db.getquery);

// app.get('/test_data', db.gettest_data);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port,() => {
  console.log(process.env.host);
  console.log(`App running on port ${port}.`);
})
