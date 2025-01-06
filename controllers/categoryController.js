const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send({
            status: true,
            data: category,
            message: "Category Created Successfully."
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            // Extract validation error details
            const errors = Object.keys(error.errors).map(field => ({
                field,
                message: error.errors[field].message
            }));

            return res.status(400).send({
                status: false,
                message: "Validation error occurred.",
                errors
            });
        }

        res.status(500).send({
            status: false,
            message: "An error occurred while saving the item data.",
            error: error.message
        });
    }
};

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).send();
};