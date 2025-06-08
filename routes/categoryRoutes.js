const express = require('express');
const { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');

const router = express.Router();

// Create a category
router.post('/category', createCategory);

// Get all categories
router.get('/categories', getCategories);

// Get a single category by ID
router.get('/category/:id', getCategoryById);

// Update a category
router.put('/category/:id', updateCategory);

// Delete a category
router.delete('/category/:id', deleteCategory);

module.exports = router;
