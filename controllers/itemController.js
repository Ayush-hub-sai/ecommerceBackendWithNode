const Item = require('../models/Item');
const handleError = require('../utils/errorHandler');  // Import the global error handler

exports.createItem = async (req, res) => {
    try {
        const item = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image 
        });
        await item.save();
        res.status(201).send({
            status: true,
            data: item,
            message: "Item Created Successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while creating the item.");
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find().populate('category');
        res.status(200).send({
            status: true,
            data: items,
            message: "Items retrieved successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while retrieving items.");  // Use global error handler
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            return res.status(404).send({
                status: false,
                message: "Item not found."
            });
        }
        res.status(200).send({
            status: true,
            data: updatedItem,
            message: "Item updated successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while updating the item.");
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).send({
                status: false,
                message: "Item not found."
            });
        }
        res.status(200).send({
            status: true,
            message: "Item deleted successfully."
        });
    } catch (error) {
        handleError(res, error, "Error occurred while deleting the item.");  // Use global error handler
    }
};
