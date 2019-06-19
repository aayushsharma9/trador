const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Product = mongoose.model('products');

module.exports = app => {
    app.post('/api/products/new', requireLogin, (req, res) => {
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
            res.send({ success: true });
        } catch (err) {
            res.status(422).send(err);
            res.send({ success: false });
        }
    });

    app.get('/api/products/all', (req, res) => {
        Product.find({}, (err, products) => {
            if (err) {
                res.send({ success: false });
            } else {
                res.send(products);
            }
        });
    });

    app.delete('/api/products/delete', requireLogin, (req, res) => {
        const { id } = req.body;
        Product.findOneAndDelete({ _id: id }, (err, doc) => {
            if (err) {
                res.send({ success: false });
            } else {
                res.send({ success: true });
            }
        });
    });

    app.put('/api/products/update', requireLogin, (req, res) => {
        if (req.body._user !== req.user.id) return;
        const { id, name, price, condition, description, category, subCategory } = req.body;
        Product.updateOne({ _id: id }, req.body, (err, raw) => {
            if (err) res.send({ success: false });
            else res.send({ success: true });
        });
    });
};