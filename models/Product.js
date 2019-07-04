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
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    postedBy: { type: Schema.Types.String, ref: 'User' },
    datePosted: Date
});

mongoose.model('products', productSchema);