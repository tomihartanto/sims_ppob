const mysql = require('mysql2/promise');

// Ganti dengan kredensial database kamu
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'db_sims_ppob',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;