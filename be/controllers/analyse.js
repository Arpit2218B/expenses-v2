const SnapshotModel = require("../models/snapshots");
const ExpensesModel = require("../models/expenses");

const analyseSnapshots = (req, res, next) => {
    const { s1, s2} = req.query;
    if(!s1 || !s2) {
        return res
        .status(400)
        .json({
            'message': 'Both s1 ans s2 required'
        })
    }
    SnapshotModel
    .find({"_id" : {"$in" : [s1, s2]}})
    .then(data => {
        res.json({
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}

const analyseSource = (req, res, next) => {
    let timeFrame = req.query.timeFrame || 0;
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth() - timeFrame, 1);
    ExpensesModel
    .aggregate([
        {
            $group:
            {
                _id: "$source.name",
                amount: {$sum: {$cond: [{$gt: ["$date", firstDay]}, "$amount", 0]}}
            }
        }
    ])
    .then(data => {
        res.json({
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}

const analyseCategory = (req, res, next) => {
    let timeFrame = req.query.timeFrame || 0;
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth() - timeFrame, 1);
    ExpensesModel
    .aggregate([
        {
            $group:
            {
                _id: "$category",
                amount: {$sum: {$cond: [{$gt: ["$date", firstDay]}, "$amount", 0]}}
            }
        }
    ])
    .then(data => {
        res.json({
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
}


module.exports = {
    analyseSnapshots,
    analyseSource,
    analyseCategory
}