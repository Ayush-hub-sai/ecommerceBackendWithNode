const Item = require('../models/Item');
const Category = require('../models/Category');
const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
    try {
        const totalItems = await Item.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            totalItems,
            totalCategories,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};