const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const transactionModel = require('../models/transactionModel');
const servicesModel = require('../models/servicesModel');
const {
    off
} = require('../config/database');

exports.topUp = async (req, res) => {
    const amount = req.body.top_up_amount; // Ambil amount dari body request
    const email = req.user.email; // dari payload JWT
    const transaction_type = 'TOPUP';

    // Validasi amount
    if (isNaN(amount) || Number(amount) < 0) {
        return res.status(200).json({
            status: 102,
            message: 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
            data: null
        });
    }

    try {
        // Ambil user_id berdasarkan email
        const user = await userModel.findUserByEmail(email);
        const userId = user.id; // Ambil user_id dari hasil query

        // Update saldo pengguna
        await userModel.updateBalance(userId, transaction_type, amount);

        // Insert transaksi top-up ke tb_transactions
        const transactionData = await transactionModel.insertTransaction({
            user_id: userId,
            transaction_type: transaction_type,
            amount: amount,
            description: 'Top up balance',
            status: 1 // atau sesuai skema enum/status kamu
        });

        res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: {
                "balance": transactionData.total_amount
            }
        });


    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });

    }
};

exports.transaction = async (req, res) => {
    const email = req.user.email; // dari payload JWT
    const service_code = req.body.service_code; // Ambil service_code dari body request
    const transaction_type = 'PAYMENT';

    const getServices = await servicesModel.getServicesByCode(service_code);
    if (!getServices) {
        return res.status(200).json({
            status: 102,
            message: 'Service ataus Layanan tidak ditemukan',
            data: null
        });
    }
    const total_amount = getServices.service_tariff; // Ambil service_tariff dari hasil query

    try {
        // Ambil user_id berdasarkan email
        const user = await userModel.findUserByEmail(email);
        const userId = user.id; // Ambil user_id dari hasil query

        const balance = Number(user.balance);
        const amount = Number(total_amount);

        if (balance < amount) {
            return res.status(200).json({
                status: 102,
                message: 'Saldo tidak cukup',
                data: null
            });
        }

        // Update saldo pengguna
        await userModel.updateBalance(userId, transaction_type, total_amount);

        // Insert transaksi top-up ke tb_transactions
        const transactionData = await transactionModel.insertTransaction({
            user_id: userId,
            transaction_type: transaction_type,
            amount: total_amount,
            description: 'Pembelian ' + getServices.service_name,
            status: 1 // atau sesuai skema enum/status kamu
        });


        res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: {
                "invoice_number": transactionData.invoice_number,
                "service_code": service_code,
                "service_name": getServices.service_name,
                "transaction_type": transactionData.transaction_type,
                "amount": transactionData.amount,
                "created_on": transactionData.created_on
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};

exports.getTransactionHistory = async (req, res) => {
    const email = req.user.email; // dari payload JWT
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset) || 0; // Default offset 0 jika tidak ada query parameter

    try {
        // Ambil user_id berdasarkan email
        const user = await userModel.findUserByEmail(email);
        const userId = user.id; // Ambil user_id dari hasil query

        // Ambil riwayat transaksi berdasarkan user_id
        const transactions = await transactionModel.getTransactionHistory(userId, limit, offset);
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: {
                "offset": offset,
                "limit": limit,
                "data": transactions
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
}