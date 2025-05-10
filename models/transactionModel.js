const db = require('../config/database');
const {
    generateInvoiceNumber
} = require('../utils/invoice');

exports.insertTransaction = async ({
    user_id,
    service_code,
    transaction_type,
    amount,
    description,
    status
}) => {

    try {
        const invoice_number = generateInvoiceNumber(); // Buat invoice unik
        const created_on = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format MySQL DATETIME

        const [result] = await db.execute(
            `INSERT INTO tb_transactions 
        (user_id, invoice_number, service_code, transaction_type, total_amount, description, status, created_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, invoice_number, service_code, transaction_type, amount, description, status, created_on]
        );

        return {
            service_code,
            invoice_number,
            transaction_type,
            total_amount: amount,
            created_on
        };
    } catch (err) {
        console.error('Gagal menyimpan transaksi:', err.message);
        throw err; // atau kirimkan response error ke client jika dalam controller
    }
};

exports.getTransactionHistory = async (userId, limit, offset) => {
    let query = `
            SELECT invoice_number, transaction_type, description, total_amount, created_date 
            FROM tb_transactions 
            WHERE user_id = ? 
            ORDER BY created_date DESC
        `;

    if (limit && limit > 0) {
        query += ` LIMIT ${limit} OFFSET ${offset}`;
    }


    const [rows] = await db.execute(query, [userId]);
    return rows;
};