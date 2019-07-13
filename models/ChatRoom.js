const mongoose = require('mongoose');
const { Schema } = mongoose;
const Chat = require('./Chat');

const chatRoomSchema = new Schema({
    messages: [Chat],
    recipients: [String]
});

mongoose.model('chatrooms', chatRoomSchema)