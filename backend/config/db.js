require('dotenv').config(); // Load environment variables from .env file
const sql = require('mssql');

console.log("Loaded ENV variables:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? '***' : undefined); // don't log the full password
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_NAME:", process.env.DB_NAME);


const dbConfig = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  server: process.env.DB_SERVER ,
  database: process.env.DB_NAME ,
  port: 1433,
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};


const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("DB_SERVER from .env:", process.env.DB_SERVER);  // should print localhost\SQLEXPRESS
    console.log('Connected to MSSQL');                  
    return pool;
  })
  .catch(err => console.log('DB Connection Failed', err));

module.exports = { sql, poolPromise };
