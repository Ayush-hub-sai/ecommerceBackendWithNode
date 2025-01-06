const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Item', ItemSchema);
