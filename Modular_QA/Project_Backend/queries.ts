const { Pool } = require('pg')
require('dotenv').config();
var request = require('request');

var jsondata = require("./main.json");

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
})

const getTable_attributes = (req, res, next) => {
  pool.query(`SELECT t.table_name,array_agg(c.column_name::text) as field, array_agg(c.data_type::text) as data_type 
  FROM information_schema.tables t
 inner join information_schema.columns c on t.table_name = c.table_name 
 WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
  GROUP BY t.table_name;`).then
    (
      function (data) {
        res.status(200);

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();

        res.json(data.rows)

      }
    ).catch(function (err) {
      return next(err);
    });
}

const getTable_with_attributes = (req, res, next) => {
  pool.query(`SELECT t.table_name as table,array_agg(c.column_name::text) as columns 
  FROM information_schema.tables t
 inner join information_schema.columns c on t.table_name = c.table_name 
 WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
  GROUP BY t.table_name;`).then
    (
      function (data) {
        res.status(200);

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();

        res.json(data.rows)

      }
    ).catch(function (err) {
      return next(err);
    });
}

const post_data = (req, res, next) => {

  request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://localhost:5000/sql_generate",
    "body": JSON.stringify({ jsondata })
  }, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    console.log(body);
    // res.send(body);
    try {
      var resultsOfFunction = FuntionToReturnQueryResult(body);
      resultsOfFunction.then(function (result) {

        res.send(result)
        return result;
      })

    }
    catch (error) {
      console.error(error);

    }


  });


}

const FuntionToReturnQueryResult = (request) => {

  var obj = JSON.parse(request);
  let query = obj.query;

  console.log('test', query)

  let results = pool.query(query).then
    (
      function (data) {

        // printing query result
        console.log(data.rows)
        return data.rows

      }
    ).catch(function (err) {
      console.log("error in query");

      return (err);
    });
  results.then(function (result) {

    return this.data

  });

  return results
}

module.exports = {
  getTable_attributes,
  getTable_with_attributes,
  post_data
}
