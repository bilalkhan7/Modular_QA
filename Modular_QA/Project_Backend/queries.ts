const { Pool } = require('pg')
require('dotenv').config();
import { jsondata, sqldata } from "./data";
var PythonShell = require('python-shell');
var pyshell = new PythonShell('script.py');

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
})

const getTable_attributes = (req, res, next) => {
  pool.query(sqldata).then
    (
      function (data) {
        res.status(200);
        // var obj=data.Json;
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
        //  res.send('table_attributes', )
        console.log("result", data)
        //  console.log("tables with attributes", obj.rows[0].columns.length)
      }
    ).catch(function (err) {
      return next(err);
    });
}

const getForeign = (req, res, next) => {
  pool.query(`select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS`).then
    (
      function (data) {
        res.status(200);
        // var obj=data.Json;
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
        //  res.send('table_attributes', )
        console.log("result", data)
        //  console.log("tables with attributes", obj.rows[0].columns.length)
      }
    ).catch(function (err) {
      return next(err);
    });
}

const getdata = (req, res, next) => {

  pyshell.send(JSON.stringify(jsondata));
  pyshell.on(' sql', function (sql) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(sql);
    pool.query(sql).then
      (
        function (data) {
          res.status(200);
          // var obj=data.Json;
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
          //  res.send('table_attributes', )
          console.log("result", data)
          //  console.log("tables with attributes", obj.rows[0].columns.length)
        }
      ).catch(function (err) {
        return next(err);
      });
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err) {
      throw err;
    };

    console.log('finished');
  });

}
module.exports = {
  getTable_attributes,
  getForeign,
  getdata,
}
