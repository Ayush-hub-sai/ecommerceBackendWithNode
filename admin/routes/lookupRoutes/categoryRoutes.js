const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../../controllers/lookupController/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;