const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: 'string',
    initialAmount: 'Number',
    limit: 'Number',
});

const SourcesModel = mongoose.model('Sources', schema);

module.exports = SourcesModel;