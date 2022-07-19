let express = require('express');
const { 
    getSources, 
    createSource,
    getSingleSource,
    updateSource,
    deleteSource
} = require('../controllers/sources');
let router = express.Router();

router.get('/', getSources);

router.get('/:id', getSingleSource);

router.post('/', createSource);

router.put('/:id', updateSource);

router.delete('/:id', deleteSource);

module.exports = {
    sourcesRouter: router
};