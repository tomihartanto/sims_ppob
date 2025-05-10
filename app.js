require('dotenv').config(); // Memuat file .env

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

// Middleware untuk memastikan response selalu menggunakan application/json
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json'); // Set the response Content-Type to application/json
    next(); // Proceed to the next middleware or route handler
});

// Menentukan mode dari variabel lingkungan NODE_ENV
const environment = process.env.NODE_ENV || 'development';

// Konfigurasi berbeda berdasarkan mode
if (environment === 'development') {
    // Konfigurasi untuk mode development
    console.log('Development Mode');
    // Pengaturan lain yang hanya ada di mode dev
} else {
    // Konfigurasi untuk mode production
    console.log('Production Mode');
    // Pengaturan lain yang hanya ada di mode prod (misal: logging minimal, optimasi)
}

app.use(bodyParser.json()); // Parse incoming JSON requests
app.use('/api', routes);

// Menentukan port dan menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${environment} mode.`);
});