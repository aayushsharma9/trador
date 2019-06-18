const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Product = mongoose.model('products');

module.exports = app => {
    app.post('/api/products', requireLogin, (req, res) => {
        console.log('LOG TAG: ', req.body);
        const { name, price, condition, description, category, subCategory } = req.body;

        const product = new Product({
            name,
            price,
            condition,
            description,
            category,
            subCategory,
            _user: req.user.id,
            datePosted: Date.now()
        });

        try {
            product.save();
            res.send(product);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};