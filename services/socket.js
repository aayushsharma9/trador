const socket = require('socket.io');
const mongoose = require('mongoose');
const ChatRoom = mongoose.model('chatrooms');

module.exports = (server) => {
    const io = socket(server);

    io.on('connection', (socket) => {
        socket.on('connect', () => {
        });

        socket.on('join', (data) => {
            socket.join(data);
        });

        socket.on('leave', (data) => {
            socket.leave(data);
        })

        socket.on('message', async (data) => {
            await io.sockets.in(data.room).emit('private message', data.chat);
            var chatRoom = await ChatRoom.findOne({ _id: data.room }, (err, chatRoom) => {
            });
            var messages = chatRoom.messages;
            messages.push(data.chat);
            ChatRoom.updateOne({ _id: data.room }, { messages }, (err, result) => {
            });
        });

        socket.on('disconnect', () => {
        });
    });
}