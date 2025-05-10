const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Pastikan host benar
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'db_sims_ppob',
    port: process.env.DB_PORT || 3306, // Sesuaikan port dengan database Anda
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000 // Timeout koneksi
});

// Fungsi untuk memeriksa koneksi
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Berhasil terkoneksi ke database MySQL');
        connection.release(); // Lepaskan koneksi setelah digunakan
    } catch (err) {
        console.error('Gagal terkoneksi ke database MySQL:', err.message);
    }
}

// Memeriksa koneksi saat aplikasi mulai
testConnection();

module.exports = db;