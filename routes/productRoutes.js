const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Product = mongoose.model('products');
const keys = require('../config/keys');

cloudinary.config({
    cloud_name: keys.cloudinaryCloudName,
    api_key: keys.cloudinaryKey,
    api_secret: keys.cloudinarySecret
});

async function uploadFiles(files) {
    var urlArray = [];

    for (var i = 0; i < files.length; i++) {
        await cloudinary.uploader.upload(files[i], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                urlArray.push(result.url);
            }
        });
    }

    return urlArray;
}

module.exports = app => {
    app.post('/api/products/new', requireLogin, async (req, res) => {
        const { name, price, condition, description, category, subCategory, files } = req.body;
        var images = [];

        images = await uploadFiles(files);
        const dateOptions = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var currentDate = new Date().toLocaleDateString('en-US', dateOptions);

        const product = new Product({
            name,
            price,
            condition,
            description,
            category,
            subCategory,
            images,
            _user: req.user.id,
            postedBy: req.user.name,
            datePosted: currentDate
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

    // app.get('/api/products/search', (req, res) => {
    //     const { searchString } = req.body;
    //     var re = new RegExp("^" + `/$searchString/`);
    //     Product.find({
    //         name: re
    //     }, (err, products) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log(products);
    //             }
    //     })
    // });

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
        const { _id } = req.body;
        Product.updateOne({ _id }, req.body, (err, raw) => {
            if (err) {
                res.send({ success: false });
            }
            else {
                res.send({ success: true });
            }
        });
    });

    app.get('/api/products/current_user_products', requireLogin, (req, res) => {
        Product.find({ _user: req.user }, (err, products) => {
            if (err) res.send({ success: false });
            else res.send(products);
        })
    });

    app.get('/api/products/:productId', (req, res) => {
        Product.findOne({ _id: req.params.productId }, (err, product) => {
            if (err) res.send({ success: false });
            else res.send(product);
        });
    });
};