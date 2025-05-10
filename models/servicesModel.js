const db = require('../config/database');

exports.getAllServices = async () => {
    try {
        const query = 'SELECT service_code, service_name, service_icon, service_tariff FROM tb_services'; // Sesuaikan nama tabel dan kolom
        const [rows] = await db.execute(query); // Menggunakan execute untuk query raw
        return rows; // Mengembalikan hasil query
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; // Lempar error jika gagal
    }
};

exports.getServicesByCode = async (service_code) => {
    try {
        const query = 'SELECT * FROM tb_services WHERE service_code = ?'; // Sesuaikan nama tabel dan kolom
        const [rows] = await db.execute(query, [service_code]); // Menggunakan execute untuk query raw
        return rows.length > 0 ? rows[0] : null; // Mengembalikan hasil query atau null jika tidak ditemukan
    } catch (error) {
        console.error('Error fetching service by code:', error);
        throw error; // Lempar error jika gagal
    }
};