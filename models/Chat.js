const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    userName: String,
    message: String
});

module.exports = chatSchema;