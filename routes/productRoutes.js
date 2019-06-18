const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Product = mongoose.model('products');

module.exports = app => {
    app.post('/api/products', (res, req) => {
        console.log('LOG TAG: ', req.body);
        const { name, price, condition, description, category, subCategory } = req.body;

        const product = new Product({
            name,
            price,
            condition,
            description,
            category,
            subCategory,
            datePosted: Date.now()
        });

        try {
            product.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};