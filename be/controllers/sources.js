const SourcesModel = require("../models/sources");

const getSources = (req, res, next) => {
    SourcesModel
    .find()
    .then(sources => {
        res
        .status(200)
        .json(sources);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const getSingleSource = (req, res, next) => {
    const id = req.params.id;
    SourcesModel
    .findById(id)
    .then(source => {
        if (source) {
            res
            .status(200)
            .json(source);
        } else {
            res
            .status(404)
            .json({
                message: 'Source not found'
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

const createSource = (req, res, next) => {
    const { name, initialAmount, limit } = req.body;
    const source = new SourcesModel({
        name,
        initialAmount,
        limit: limit || 0
    });
    source
    .save()
    .then(() => {
        res
        .status(201)
        .json(source);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const updateSource = (req, res, next) => {
    const id = req.params.id;
    const { name, amount, limit } = req.body;
    SourcesModel
    .findById(id)
    .then(source => {
        if (source) {
            source.name = name || source.name;
            source.amount = amount || source.amount;
            source.limit = limit || source.limit;
            return source.save();
        } else {
            return Promise.reject({
                message: 'Source not found'
            });
        }
    })
    .then(source => {
        res
        .status(200)
        .json(source);
    })
    .catch(err => {
        res
        .status(500)
        .json({
            error: err
        });
    });
}

const deleteSource = (req, res, next) => {
    const id = req.params.id;
    SourcesModel
    .findById(id)
    .then(source => {
        if (source) {
            return source.remove();
        } else {
            return Promise.reject({
                message: 'Source not found'
            });
        }
    })
    .then(() => {
        res
        .status(200)
        .json({
            message: 'Source deleted'
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
    getSources,
    createSource,
    getSingleSource,
    updateSource,
    deleteSource
}