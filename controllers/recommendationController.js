const Recommendation = require('../models/Recommendation');
const Item = require('../models/Item');

// Create a recommendation
exports.createRecommendation = async (req, res) => {
    try {
        const { itemId, recommendedItems } = req.body;
        const recommendation = new Recommendation({ itemId, recommendedItems });
        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get recommendations for an item
exports.getRecommendations = async (req, res) => {
    try {
        const { itemId } = req.params;
        const recommendations = await Recommendation.findOne({ itemId }).populate('recommendedItems');
        if (!recommendations) {
            return res.status(404).json({ message: 'No recommendations found' });
        }
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update recommendations
exports.updateRecommendation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecommendation = await Recommendation.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }
        res.json(updatedRecommendation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a recommendation
exports.deleteRecommendation = async (req, res) => {
    try {
        const { id } = req.params;
        await Recommendation.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};