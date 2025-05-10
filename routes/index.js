const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    body
} = require('express-validator');

const {
    validationResult
} = require('express-validator');


const authController = require('../controllers/authController');
const bannerController = require('../controllers/bannerController');
const servicesController = require('../controllers/servicesController');
// const balanceController = require('../controllers/balanceController');
// const topupController = require('../controllers/topupController');
const transactionController = require('../controllers/transactionController');


router.post(
    '/registration',
    [
        body('email').isEmail().withMessage('Email tidak valid'),
        body('password').isLength({
            min: 8
        }).withMessage('Password minimal 8 karakter'),
    ],
    authController.registration
);

router.post('/login',
    [
        body('email').isEmail().withMessage('Email tidak valid'),
        body('password').isLength({
            min: 8
        }).withMessage('Password minimal 8 karakter'),
    ], authController.login
);

router.get('/profile', auth, authController.getProfile);
router.get('/banner', bannerController.getBanner);
router.get('/services', servicesController.getServices);

router.get('/balance', auth, authController.getBalance);
router.post('/topup', auth, transactionController.topUp);
router.post('/transaction', auth, transactionController.transaction);
router.get('/transaction/history', auth, transactionController.getTransactionHistory);

module.exports = router;