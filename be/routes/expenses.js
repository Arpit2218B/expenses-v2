let express = require('express');
const { getExpenses, 
        createExpense, 
        deleteExpenses } = require('../controllers/expenses');
let router = express.Router();

router.get('/', getExpenses);

router.post('/', createExpense);

router.delete('/:id', deleteExpenses);

module.exports = {
    ExpensesRouter: router
};