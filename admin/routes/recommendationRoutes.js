const express = require('express');
const { createRecommendation, getRecommendations, updateRecommendation, deleteRecommendation } = require('../controllers/recommendationController');
const router = express.Router();

router.post('/', createRecommendation);
router.get('/:itemId', getRecommendations);
router.put('/:id', updateRecommendation);
router.delete('/:id', deleteRecommendation);

module.exports = router;