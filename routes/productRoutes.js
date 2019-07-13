const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Product = mongoose.model('products');
const User = mongoose.model('users');
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

    app.post('/api/products/search', (req, res) => {
        const { searchString } = req.body;
        var regex = new RegExp(searchString, 'i');
        Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { postedBy: regex },
                { category: regex },
                { subCategory: regex },
                { datePosted: regex }
            ]
        }, (err, products) => {
            if (err) {
                res.send({ success: false });
            } else {
                res.send(products);
            }
        });
    });

    app.delete('/api/products/delete/:productId', requireLogin, (req, res) => {
        Product.findOneAndDelete({ _id: req.params.productId }, (err, doc) => {
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

    app.get('/api/products/view/:productId', (req, res) => {
        Product.findOne({ _id: req.params.productId }, (err, product) => {
            if (err) res.send({ success: false });
            else res.send(product);
        });
    });

    app.get('/api/products/save', requireLogin, async (req, res) => {
        User.findOne({ _id: req.user._id })
            .populate('savedProducts').exec((err, user) => {
                res.send(user);
            })
    });

    
    app.post('/api/products/save', requireLogin, async (req, res) => {
        req.user.savedProducts.push(req.body._id);
        await req.user.save();
        User.findOne({ _id: req.user._id })
            .populate('savedProducts').exec((err, user) => {
                res.send(user);
            });
    });

    app.post('/api/products/unsave', requireLogin, async (req, res) => {
        const { savedProducts } = req.user;
        const { _id } = req.body;
        for (var i = 0; i < savedProducts.length; i++) {
            if (savedProducts[i]._id == _id) {
                savedProducts.splice(i, 1);
            }
        }
        const user = await req.user.save();
        User.findOne({ _id: req.user._id })
        .populate('savedProducts').exec((err, user) => {
            res.send(user);
        });
    });
};