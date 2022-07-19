let express = require('express');
const {
    getSnapshots,
    getSingleSnapshot,
    createSnapshot,
    deleteSnapshot
} = require('../controllers/snapshots');
let router = express.Router();

router.get('/', getSnapshots);

router.get('/:id', getSingleSnapshot);

router.post('/', createSnapshot);

router.delete('/:id', deleteSnapshot);

module.exports = {
    SnapshotRouter: router
};