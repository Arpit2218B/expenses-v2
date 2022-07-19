const ExpensesModel = require("../models/expenses");
const SourceModel = require("../models/sources");
const { getCurrentDateString } = require("../utils/dateUtility");

const getExpenses = (req, res, next) => {
    const { startDate, endDate, source, category} = req.query;
    let filterObj = {}
    let filterArray = [];
    let date = new Date();
    let firstDay = new Date('1/1/1997');
    let lastDay = new Date();
    let dateFilter = {date:{$gt: new Date(startDate || firstDay),$lte: new Date(endDate || lastDay)}};
    filterArray.push(dateFilter);
    if(source) filterArray.push({'source._id': source})
    if(category)filterArray.push({'category._id': category})
    filterObj = {
            $and: filterArray
        }
    ExpensesModel
    .find(filterObj)
    .then(expenses => {
        res
        .status(200)
        .json(expenses);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const createExpense = async (req, res, next) => {
    // write complete logic for the create expense
    // {
    //     source: "",
    //     category: "",
    //     amount: "",
    //     description: "",
    //     date: "",
    //     tag: CREDITED / DEBITED / TRANSFER,
    //     splitted: true / false,
    //     transferAccount: "",
    //     splitAmount: ""
    // }
    try {
        const { category, source, destination, amount, splitted, splitAmount, description} = req.body;
        let date = getCurrentDateString();
        console.log(date);
        let record1 = {
            source: source,
            category: category,
            amount: amount,
            description: description,
            date: date,
            tag: category.type === 'income' ? 'CREDITED' : 'DEBITED'
        }
        let record2 = null;
        if(splitted) {
            record2 = {
                source: {
                    _id: '62ac8bb21c2bf7a089912812',
                    name: 'Splitwise'
                },
                category: category,
                amount: splitAmount,
                description: description,
                date: date,
                tag: 'CREDITED'
            }
        }
        if(category.type === 'transfer') {
            record2 = {
                source: destination,
                category: category,
                amount: amount,
                description: description,
                date: date,
                tag: 'CREDITED'
            }
        }

        // fetch accounts and reduce/increase amounts from them
        // save

        let sourceData1 = await SourceModel.findById(record1.source._id);
        let record1Amount = record1.tag == 'CREDITED' ? record1.amount : -1 * record1.amount;
        sourceData1.initialAmount = sourceData1.initialAmount + record1Amount;
        await SourceModel.updateOne({_id: sourceData1._id}, {initialAmount: sourceData1.initialAmount});

        const Expense1 = new ExpensesModel(record1);
        await Expense1.save();
        if(record2) {
            let sourceData2 = await SourceModel.findById(record2.source._id);
            let record2Amount = record2.tag == 'CREDITED' ? record2.amount : -1 * record2.amount;
            sourceData2.initialAmount = sourceData2.initialAmount + record2Amount;
            await SourceModel.updateOne({_id: sourceData2._id}, {initialAmount: sourceData2.initialAmount});
            const Expense2 = new ExpensesModel(record2);
            await Expense2.save();
        }
        res
        .status(201)
        .json({
            message: 'Expense recorded'
        });
    }
    catch(err) {
        res
        .status(500)
        .json({
            error: err
        });
    }
}

const deleteExpenses = (req, res, next) => {
    const id = req.params.id;
    ExpensesModel
    .findById(id)
    .then(expense => {
        if (expense) {
            return expense.remove();
        } else {
            return Promise.reject({
                message: 'Expense not found'
            });
        }
    })
    .then(() => {
        res
        .status(200)
        .json({
            message: 'Expense deleted'
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
    getExpenses,
    createExpense,
    deleteExpenses
}