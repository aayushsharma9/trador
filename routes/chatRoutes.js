const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const ChatRoom = mongoose.model('chatrooms');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/chatrooms/new/:recipientId', requireLogin, async (req, res) => {
        const chatRoom = new ChatRoom({
            recipients: req.body.recipients,
            messages: []
        });
        try {
            saved = await chatRoom.save();
            User.findOne({ _id: req.params.recipientId }, (err, user) => {
                user.chatRooms.push(saved._id);
                user.save();
            });
            req.user.chatRooms.push(saved._id);
            await req.user.save();
            User.findOne({ _id: req.user._id })
                .populate('chatRooms').exec((err, user) => {
                    if (err) res.send({ success: false });
                    else res.send(user);
                });
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/chatrooms/get/:roomId', requireLogin, async (req, res) => {
        ChatRoom.findOne({ _id: req.params.roomId }, (err, doc) => {
            if (err) res.send({ success: false });
            else res.send(doc);
        });
    });

    app.get('/api/chatrooms/all', requireLogin, async (req, res) => {
        User.findOne({ _id: req.user._id })
            .populate('chatRooms').exec((err, user) => {
                if (err) res.send(err);
                else res.send(user);
            });
    });
}