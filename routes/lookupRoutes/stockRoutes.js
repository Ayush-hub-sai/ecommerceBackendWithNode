const express = require('express');
const router = express.Router();
const { 
    addStock, 
    getAllStocks, 
    reduceStock, 
    setOutOfStock, 
    getStockStatus, 
    deleteStock, 
    updateStock  
} = require('../../controllers/lookupController/stockController');

router.post('/add', addStock);
router.get('/', getAllStocks);
router.post('/reduce', reduceStock);
router.post('/outofstock', setOutOfStock);
router.put('/update', updateStock);  
router.get('/:itemId', getStockStatus);
router.delete('/:id', deleteStock);

module.exports = router;
