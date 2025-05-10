const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.registration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102, // custom app code
            message: 'Parameter email tidak sesuai format',
            data: null,
        });
    }

    const {
        email,
        first_name,
        last_name,
        password,
        profile_image,
        balance
    } = req.body;

    // Set null untuk parameter opsional yang tidak ada
    const profileImage = profile_image || null; // Jika profile_image tidak ada, set ke null
    const userBalance = balance || 0; // Jika balance tidak ada, set ke null

    try {
        const hashed = await bcrypt.hash(password, 10);
        await userModel.createUser(email, first_name, last_name, hashed, profileImage, userBalance);
        res.status(200).json({
            status: 0,
            message: 'Registrasi berhasil silahkan login',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: 'Registrasi gagal',
            data: null,
            error: err.message || err // Include the error message in the response
        });
    }
};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // Validasi hasil dari express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102,
            message: 'Paramter email tidak sesuai format',
            data: null
        });
    }

    try {
        // Cari user berdasarkan email
        const user = await userModel.findUserByEmail(email);

        // Jika user tidak ditemukan atau password tidak cocok
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: 103,
                message: 'Username atau password salah',
                data: null
            });
        }

        // Membuat JWT token dengan payload email dan expiration time 12 jam
        const payload = {
            email: user.email
        };

        // Pastikan secret key sudah didefinisikan dalam .env
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(payload, secretKey, {
            expiresIn: '12h' // Token expired dalam 12 jam
        });

        // Response dengan token JWT
        res.status(200).json({
            status: 0,
            message: 'Login Sukses',
            data: {
                token
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const {
            email
        } = req.user; // Diambil dari JWT payload
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User tidak ditemukan',
                data: null,
            });
        }

        // Hapus password dari hasil query
        const {
            password,
            ...userData
        } = user;

        return res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: {
                "email": userData.email,
                "first_name": userData.first_name,
                "last_name": userData.last_name,
                "profile_image": userData.profile_image
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};


exports.getBalance = async (req, res) => {
    try {
        const {
            email
        } = req.user; // Diambil dari JWT payload
        const user = await userModel.findUserByEmail(email);

        // Hapus password dari hasil query
        const {
            password,
            ...userData
        } = user;

        return res.status(200).json({
            status: 0,
            message: 'Get Balance Berhasil',
            data: {
                balance: userData.balance, // Ambil balance dari userData
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};