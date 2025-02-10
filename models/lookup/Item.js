const mongoose = require('mongoose');  

const ItemSchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },  
    price: { type: Number, required: true },  
    image: [{ type: String, required: false }],
});  

module.exports = mongoose.model('Item', ItemSchema);