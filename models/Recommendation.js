const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    recommendedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);