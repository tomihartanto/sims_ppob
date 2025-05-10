const db = require('../config/database');

exports.getAllBanners = async () => {
    try {
        const query = 'SELECT banner_name, banner_image, description FROM tb_banners'; // Sesuaikan nama tabel dan kolom
        const [rows] = await db.execute(query); // Menggunakan execute untuk query raw
        return rows; // Mengembalikan hasil query
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error; // Lempar error jika gagal
    }
};