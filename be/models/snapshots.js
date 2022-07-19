const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
    name: 'string',
    initialAmount: 'Number',
    limit: 'Number',
});

const schema = new mongoose.Schema({
    date: 'string',
    snap: [SourceSchema]
});

const SnapshotModel = mongoose.model('Snapshot', schema);

module.exports = SnapshotModel;