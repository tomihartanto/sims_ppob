const servicesModel = require('../models/servicesModel');

exports.getServices = async (req, res) => {
    try {
        const services = await servicesModel.getAllServices();

        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: services
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};