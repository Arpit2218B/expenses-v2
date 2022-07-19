const SnapshotModel = require("../models/snapshots");
const SourcesModel = require("../models/sources");
const { getCurrentDateString } = require("../utils/dateUtility");

const getSnapshots = (req, res, next) => {
    SnapshotModel
    .find()
    .then(snapshots => {
        res
        .status(200)
        .json(snapshots);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const getSingleSnapshot = (req, res, next) => {
    const id = req.params.id;
    SnapshotModel
    .findById(id)
    .then(snapshot => {
        if (snapshot) {
            res
            .status(200)
            .json(snapshot);
        } else {
            res
            .status(404)
            .json({
                message: 'Snapshot not found'
            });
        }
    })
    .catch(err => {
        res
        .status(500)
        .json({
            error: err
        });
    });
}

const createSnapshot = async (req, res, next) => {
    let data = await SourcesModel.find();
    const body = {
        date: getCurrentDateString(),
        snap: data
    }
    const Snapshot = new SnapshotModel(body);
    Snapshot
    .save()
    .then(() => {
        res
        .status(201)
        .json(Snapshot);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const deleteSnapshot = (req, res, next) => {
    const id = req.params.id;
    SnapshotModel
    .findById(id)
    .then(snapshot => {
        if (snapshot) {
            return snapshot.remove();
        } else {
            return Promise.reject({
                message: 'Snapshot not found'
            });
        }
    })
    .then(() => {
        res
        .status(200)
        .json({
            message: 'Snapshot deleted'
        });
    })
    .catch(err => {
        res
        .status(500)
        .json({
            error: err
        });
    });
}

module.exports = {
    getSnapshots,
    createSnapshot,
    getSingleSnapshot,
    deleteSnapshot
}