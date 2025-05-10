const bannerModel = require('../models/bannerModel');

exports.getBanner = async (req, res) => {
    try {
        const banners = await bannerModel.getAllBanners();

        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: banners
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
};