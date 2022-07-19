let mongoose = require('mongoose');

const dbConnect = () => {
    try {
        mongoose.connect('mongodb+srv://root:root@expenses-cluster.vrjo3.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to database');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    dbConnect
}