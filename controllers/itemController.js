const Item = require('../models/Item');

exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send({
            status: true,
            data: item,
            message: "Item Created Successfully."
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
            message: "An error occurred while saving the item.",
            error: error.message
        });
    }
};

exports.getItems = async (req, res) => {
    const items = await Item.find().populate('category');
    res.json(items);
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(204).send();
};