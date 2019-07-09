const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    facebookID: String,
    name: String,
    savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);