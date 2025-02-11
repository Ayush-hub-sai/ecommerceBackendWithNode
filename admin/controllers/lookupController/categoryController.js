const Category = require('../../../admin/models/lookup/Category');
const handleError = require('../../../utils/errorHandler');  // Import the global error handler

exports.createCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            image: req.body.image 
        });
        await category.save();
        res.status(201).send({
            status: true,
            data: item,
            message: "Category Created Successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while creating the category.");  // Use global error handler
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({
            status: true,
            data: categories,
            message: "Categories retrieved successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while retrieving categories.");  // Use global error handler
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).send({
                status: false,
                message: "Category not found."
            });
        }
        res.status(200).send({
            status: true,
            data: updatedCategory,
            message: "Category updated successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while updating the category.");  // Use global error handler
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({
                status: false,
                message: "Category not found."
            });
        }
        res.status(200).send({
            status: true,
            message: "Category deleted successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while deleting the category.");  // Use global error handler
    }
};
