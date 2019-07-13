const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    images: [String],
    condition: String,
    description: String,
    category: String,
    subCategory: String,
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    postedBy: { type: Schema.Types.String, ref: 'users' },
    datePosted: String
});

mongoose.model('products', productSchema);