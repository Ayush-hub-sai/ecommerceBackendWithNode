const Item = require('../models/Item');

exports.createItem = async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
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