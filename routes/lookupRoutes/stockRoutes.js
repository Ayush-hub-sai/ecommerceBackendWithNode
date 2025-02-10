const express = require('express');
const router = express.Router();
const { addStock, getAllStocks, reduceStock, setOutOfStock,getStockStatus, deleteStock } = require('../../controllers/lookupController/stockController');

router.post('/add', addStock);
router.get('/', getAllStocks);
router.post('/reduce', reduceStock);
router.post('/outofstock', setOutOfStock);
router.get('/:itemId', getStockStatus);
router.delete('/:id', deleteStock);


module.exports = router;
