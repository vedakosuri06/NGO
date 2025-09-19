const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',     // or your MySQL server IP
  user: 'root',          // your MySQL username
  password: 'VedaKosuri@123',  // your MySQL password
  database: 'ngo_db'     // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

module.exports = db;
