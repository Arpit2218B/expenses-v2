const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: 'string',
    type: {
        type: 'string',
        values: ['income', 'expense', 'transfers'],
        default: 'expense'
    },
    limit: 'Number'
});

const CategoryModel = mongoose.model('Category', schema);

module.exports = CategoryModel;