let express = require('express');
const { 
    getCategory, 
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
let router = express.Router();

router.get('/', getCategory);

router.get('/:id', getSingleCategory);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = {
    CategoryRouter: router
};