// [ ] /analyse/snapshot?s1={}&s2={}
// [ ] /analyse/source?timeFrame={}
// [ ] /analyse/category?timeFrame={}

let express = require('express');
const { 
    analyseSnapshots, 
    analyseSource, 
    analyseCategory
} = require('../controllers/analyse');

let router = express.Router();

router.get('/snapshot', analyseSnapshots)

router.get('/source', analyseSource)

router.get('/category', analyseCategory)

module.exports = {
    analyseRouter: router
}