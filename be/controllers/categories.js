const CategoryModel = require("../models/categories");

const getCategory = (req, res, next) => {
    CategoryModel
    .find()
    .then(Category => {
        res
        .status(200)
        .json(Category);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const getSingleCategory = (req, res, next) => {
    const id = req.params.id;
    CategoryModel
    .findById(id)
    .then(Category => {
        if (Category) {
            res
            .status(200)
            .json(Category);
        } else {
            res
            .status(404)
            .json({
                message: 'Category not found'
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

const createCategory = (req, res, next) => {
    const { name, type } = req.body;
    const Category = new CategoryModel({
        name,
        type,
        limit: req.body.limit ? req.body.limit : 0
    });
    Category
    .save()
    .then(() => {
        res
        .status(201)
        .json(Category);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const updateCategory = (req, res, next) => {
    const id = req.params.id;
    const { name, type } = req.body;
    CategoryModel
    .findById(id)
    .then(Category => {
        if (Category) {
            Category.name = name || Category.name;
            Category.type = type || Category.type;
            return Category.save();
        } else {
            return Promise.reject({
                message: 'Category not found'
            });
        }
    })
    .then(Category => {
        res
        .status(200)
        .json(Category);
    })
    .catch(err => {
        res
        .status(500)
        .json({
            error: err
        });
    });
}

const deleteCategory = (req, res, next) => {
    const id = req.params.id;
    CategoryModel
    .findById(id)
    .then(Category => {
        if (Category) {
            return Category.remove();
        } else {
            return Promise.reject({
                message: 'Category not found'
            });
        }
    })
    .then(() => {
        res
        .status(200)
        .json({
            message: 'Category deleted'
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
    getCategory,
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
}