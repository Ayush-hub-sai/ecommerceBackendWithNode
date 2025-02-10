const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true, unique: true },
    quantity: { type: Number, default: 0 }, // Default stock quantity set to zero
    isOutOfStock: { type: Boolean, default: true } // Default to out of stock
});

// Middleware: Update `isOutOfStock` before saving
StockSchema.pre('save', function (next) {
    this.isOutOfStock = this.quantity <= 0;
    next();
});

module.exports = mongoose.model('Stock', StockSchema);
