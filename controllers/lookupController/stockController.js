const Stock = require('../../models/lookup/Stock');
const Item = require('../../models/lookup/Item');

exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().populate('item');

        if (!stocks.length) return res.status(404).json({ message: 'No stock records found' });

        // Ensure stock status is updated dynamically
        stocks.forEach(stock => {
            stock.isOutOfStock = stock.quantity <= 0;
        });

        res.status(200).json({
            status: true,
            data: stocks.filter(stockItem=>stockItem.item!=null), 
            message: "Stock items retrieved successfully."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        const stock = await Stock.findOne({ item: itemId });

        if (!stock) {
            return res.status(404).json({ message: 'Stock record not found' });
        }

        stock.quantity = quantity;
        stock.isOutOfStock = quantity === 0; 

        await stock.save();

        res.status(200).json({ message: 'Stock updated successfully', stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.setOutOfStock = async (req, res) => {
    try {
        const { itemId } = req.body;
        const stock = await Stock.findOneAndUpdate(
            { item: itemId },
            { isOutOfStock: true, quantity: 0 },
            { new: true }
        );

        if (!stock) return res.status(404).json({ message: 'Stock record not found' });

        res.status(200).json({ message: 'Item marked as out of stock', stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addStock = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        let stock = await Stock.findOne({ item: itemId });

        if (!stock) {
            stock = new Stock({ item: itemId, quantity });
        } else {
            stock.quantity += quantity;
        }

        await stock.save();
        res.status(200).json({ message: 'Stock added successfully', stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.reduceStock = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const stock = await Stock.findOne({ item: itemId });

        if (!stock) return res.status(404).json({ message: 'Stock record not found' });

        if (stock.quantity < quantity) return res.status(400).json({ message: 'Not enough stock available' });

        stock.quantity -= quantity;

        if (stock.quantity <= 0) {
            stock.isOutOfStock = true;
            stock.quantity = 0; // Prevent negative stock
        }

        await stock.save();
        res.status(200).json({ message: 'Stock updated successfully', stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStockStatus = async (req, res) => {
    try {
        const { itemId } = req.params;
        const stock = await Stock.findOne({ item: itemId }).populate('item');

        if (!stock) return res.status(404).json({ message: 'Stock record not found' });

        res.status(200).json({ stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteStock = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Stock.findByIdAndDelete(id);
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

