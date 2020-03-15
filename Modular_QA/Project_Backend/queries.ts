const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
})  

const getTable_attributes = (req, res, next) => {
   pool.query(`SELECT t.table_name,array_agg(c.column_name::text) as columns 
    FROM information_schema.tables t
    inner join information_schema.columns c on t.table_name = c.table_name 
    WHERE t.table_schema = 'public' AND t.table_type= 'BASE TABLE' AND c.table_schema = 'public'
    GROUP BY t.table_name;`).then 
    (
      function (data){
        res.status(200);
      var obj=data;
       res.render('table_attributes', {table_attributes:obj})
       console.log("tables with attributes", obj.rows[0].columns.length)
      }
    ).catch(function(err){
      return next(err);
    });
  }

module.exports = {
  getTable_attributes
}
