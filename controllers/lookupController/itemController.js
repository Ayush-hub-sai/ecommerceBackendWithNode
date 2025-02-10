const Item = require('../../models/lookup/Item');
const Stock = require('../../models/lookup/Stock');
const handleError = require('../../utils/errorHandler');  // Import the global error handler

exports.createItem = async (req, res) => {
    try {
        // Create new item
        const item = new Item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image
        });
        await item.save();

        // Create a stock entry for the new item with default quantity 0
        const stock = new Stock({
            item: item._id,
            quantity: 0,          // Default stock is 0
            isOutOfStock: true    // Mark as out of stock initially
        });
        await stock.save();

        res.status(201).send({
            status: true,
            data: { item, stock },
            message: "Item Created Successfully with default stock."
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
