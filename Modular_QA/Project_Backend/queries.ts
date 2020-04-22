const { Pool } = require('pg')
require('dotenv').config();
// import {  sqldata } from "./data";
// import { sqldata } from "./data";
// import {PythonShell} from 'python-shell';
// var pyshell = new PythonShell('script.py');

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
        //  res.send('table_attributes', )
        // console.log("result", data)
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
        // console.log("result", data)
        //  console.log("tables with attributes", obj.rows[0].columns.length)
      }
    ).catch(function (err) {
      return next(err);
    });
}

const getdata = (req, res, next) => {
// }

const sql = req.body
console.log('test', sql)
}
//   pyshell.send(JSON.stringify(sql));
//   pyshell.on(' sql', function (sql) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(sql);
//     pool.query(sql).then
//       (
//         function (data) {
//     res.status(200);
//     // var obj=data.Json;
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();

//     res.json(data.rows)
//     //  res.send('table_attributes', )
//     // console.log("result", data)
//     //  console.log("tables with attributes", obj.rows[0].columns.length)
//   }
// ).catch(function (err) {
//   return next(err);
// });
// res.status(200);
// }
// var obj=data.Json;
//           res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//           // Request methods you wish to allow
//           res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//           // Request headers you wish to allow
//           res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//           // Set to true if you need the website to include cookies in the requests sent
//           // to the API (e.g. in case you use sessions)
//           res.setHeader('Access-Control-Allow-Credentials', true);

//           // Pass to next layer of middleware
//           next();

//           res.json(data.rows)
//           //  res.send('table_attributes', )
//           console.log("result", data)
//           //  console.log("tables with attributes", obj.rows[0].columns.length)
//         }
//       ).catch(function (err) {
//         return next(err);
//       });
//   });

//   // end the input stream and allow the process to exit
//   pyshell.end(function (err) {
//     if (err) {
//       throw err;
//     };
//     console.log('finished');
//   });

// }

// const gettest_data = ( req, res, next) => {
//   pool.query(`SELECT s.store_name as "Store name", s.store_city as "City", s.store_street_address as "Address", s.store_state as "State", 
//   COUNT(DISTINCT sf.product_id) as "Products" 
//   FROM store s JOIN sales_fact sf on sf.store_id = s.store_id JOIN time_by_day t 
//   on t.time_id = sf.time_id WHERE s.store_country='Canada' 
//   and t.quarter = 'Q3' 
//   GROUP BY s.store_name, s.store_street_address, s.store_city, s.store_state; `).then
//    (function(data){
//     (res => console.log(res.rows[0].City))
//     .catch(err => console.error('Error executing query', err.stack))
//   //   Object.entries(data).forEach( => {
//   //     console.log(`${key} ${value}`);
//   // });

//    (res => console.log(res.rows[0].City))
//   .catch(err => console.error('Error executing query', err.stack))
//   res.json('run', res.rows[0].City)
// }
 

//   ( 
//     function(data){
//       for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//            console.log(data[key].City);
//         }
//      }});
//       for (var key in data) {
//           if (data.hasOwnProperty(key)) {
//             console.log('test', data[key].City);
//           }
//         }
//       });
//     }

  
//     for (var key in data) {
//       if (data.hasOwnProperty(key)) {
//         console.log('test', data[key].Products);
//         // alert(JSON[key].City);
      
//     var myObject = JSON.parse(data);
//     var str="<table width='200'  align=center>";
//     for(let i=0;i<myObject.length;i++)
//     { 
//     str = str + "<tr ><td >ID:</td><td>" + myObject.data.rows.store_name[i] + " </td></tr>";
//     str = str + "<tr ><td >Name:</td><td>" + myObject.data.rows.Products[i] + " </td></tr>";
    
//     str  = str + "<tr ><td>Class</td><td>"+ myObject.data.rows.City[i] + "</td></tr>";
//     str  = str + "<tr><td>Mark</td><td>"+ myObject.data.rows.State[i] + "</td></tr>";
//     }
    
//     str = str + "</table>" ;
//   console.log('test', str)
//     ?data.forEach(data => {
      
//     });
//   res.status(200);

//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();

//   res.json(data.rows)
//   //  res.send('table_attributes', )
//   console.log("result", data.rows)
//   //  console.log("tables with attributes", obj.rows[0].columns.length)
// }
// ).catch(function (err) {
// return next(err);
// });
// }

module.exports = {
  getTable_attributes,
  getForeign,
  // gettest_data
  getdata
}
