const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    name: 'string',
    initialAmount: 'Number',
    limit: 'Number',
});

const categorySchema = new mongoose.Schema({
    name: 'string',
    type: {
        type: 'string',
        values: ['income', 'expense', 'transfers'],
        default: 'expense'
    },
    limit: 'Number'
});

const schema = new mongoose.Schema({
    date: 'date',
    amount: 'number',
    category: categorySchema,
    source: sourceSchema,
    description: 'string',
    tag: 'string'
});

const ExpensesModel = mongoose.model('Expenses', schema);

module.exports = ExpensesModel;