const db = require('../config/database');

// exports.createUser = (email, first_name, last_name, password, profile_image, balance) =>
//     db.execute('INSERT INTO tb_users (email, first_name, last_name, password, profile_image, balance) VALUES (?, ?, ?, ?, ?, ?)', [email, first_name, last_name, password, profile_image, balance]);

exports.createUser = (email, first_name, last_name, password, profile_image, balance) => {
    const created_on = new Date();
    return db.execute('INSERT INTO tb_users (email, first_name, last_name, password, profile_image, balance, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [email, first_name, last_name, password, profile_image, balance, created_on])
        .then(([result]) => {
            console.log('User created successfully:', result);
            return result; // Return result for further use (e.g., in controller)
        })
        .catch((err) => {
            console.error('Error inserting user:', err);
            throw err; // Rethrow the error to be handled in controller
        });
};

exports.findUserByEmail = async (email) => {
    const [getUser] = await db.execute('SELECT * FROM tb_users WHERE email = ? LIMIT 1', [email]);
    return getUser.length > 0 ? getUser[0] : null; // Return the first user or null if not found
};

exports.getProfile = async () => {
    const [getUser] = await db.execute('SELECT * FROM tb_users WHERE email = ? LIMIT 1', [email]);
    return getUser.length > 0 ? getUser[0] : null; // Return the first user or null if not found
};

exports.getBalance = async (userId) => {
    const [rows] = await db.execute('SELECT balance FROM users WHERE id = ?', [userId]);
    return rows[0];
};

exports.updateBalance = async (userId, transaction_type, amount) => {
    let query;
    let values;

    if (transaction_type === 'TOPUP') {
        query = 'UPDATE tb_users SET balance = balance + ? WHERE id = ?';
        values = [amount, userId];
    } else if (transaction_type === 'PAYMENT') {
        query = 'UPDATE tb_users SET balance = balance - ? WHERE id = ?';
        values = [amount, userId];
    } else {
        throw new Error('Tipe transaksi tidak valid');
    }

    // Jalankan update saldo
    await db.execute(query, values);

    // Ambil saldo terbaru setelah update
    const [rows] = await db.execute('SELECT balance FROM tb_users WHERE id = ?', [userId]);
    return rows[0].balance;
    // db.execute('UPDATE tb_users SET balance = balance + ? WHERE id = ?', [newBalance, userId]);
};