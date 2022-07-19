let express = require('express');
let cors = require('cors');
let morgan = require('morgan');
let { dbConnect } = require('./database');
const { sourcesRouter } = require('./routes/sources');
const { CategoryRouter } = require('./routes/categories');
const { SnapshotRouter } = require('./routes/snapshots');
const { ExpensesRouter } = require('./routes/expenses');
const { analyseRouter } = require('./routes/analyse');

const PORT = process.env.PORT || 3000;

let app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/sources', sourcesRouter);
app.use('/categories', CategoryRouter);
app.use('/snapshots', SnapshotRouter);
app.use('/expenses', ExpensesRouter);
app.use('/analyse', analyseRouter);

// error handler
app.use((error, req, res, next) => {
    res.status(500).send({
        error: error.message
    });
})

// 404 NOT FOUND
app.use('/', (req, res) => {
    res.status(404).send({
        error: 'Not found'
    });
})


app.listen(PORT, (err) => {
    dbConnect();
    if (err) {
        console.log(err);
    } else {
        console.log('Server started on port ' + PORT);
    }
})