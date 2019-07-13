import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import _ from 'lodash';
import './ChatRoom.css';
import { fetchChatRooms } from '../actions';
import { Button } from './common';

const socket = socketIOClient('localhost:5000');

class ChatRoom extends Component {
    state = {
        chat: {
            userId: '',
            userName: '',
            message: '',
        },
        messages: [],
        chatRooms: [],
        selectedRoomId: ''
    }

    async componentWillMount() {
        await this.props.fetchChatRooms();
        this.setState({
            chat: {
                userId: this.props.user._id,
                userName: this.props.user.name
            },
            chatRooms: this.props.user.chatRooms,
            selectedRoomId: this.props.user.chatRooms[0]._id
        });
        this.joinRoom(this.state.selectedRoomId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                chat: {
                    userId: nextProps.user._id,
                    userName: nextProps.user.name
                }
            });
        }
    }

    componentDidMount() {
        socket.emit('join', { key: this.state.selectedRoomId })
        socket.on('private message', (chat) => {
            const mes = this.state.messages;
            mes.push(chat);
            this.setState({ messages: mes });
        })
        this.setState({
            user: this.props.user
        })
    }

    async joinRoom(roomId) {
        socket.emit('join', roomId);
        await this.props.fetchChatRooms();
        await this.setState({ chatRooms: this.props.user.chatRooms });
        const messages = await _.find(this.state.chatRooms, { _id: this.state.selectedRoomId }).messages;
        this.setState({ messages });
    }

    send() {
        if (!this.state.chat.message) return;
        socket.emit('message', { room: this.state.selectedRoomId, chat: this.state.chat });
        this.setState((prevState, props) => ({
            chat: {
                ...prevState.chat,
                message: ''
            }
        }))
    }

    handleOnChange = (event) => {
        const value = event.target.value;
        this.setState((prevState, props) => ({
            chat: {
                ...prevState.chat,
                message: value
            }
        }))
    }

    renderMessageItem(item, key) {
        let style = 'chat-room-other-message-container';
        if (item.userId === this.state.chat.userId) {
            style = 'chat-room-self-message-container';
        }
        return (
            <div className={style} key={key}>
                <p className='chat-room-message'>{item.message}</p>
            </div>
        )
    }

    renderRecipientItem(chatRoom) {
        const { recipients } = chatRoom;
        var recipientName = recipients[0];
        var style = 'chat-room-recipient-item';

        for (var i = 0; i < recipients.length; i++) {
            if (recipients[i] !== this.state.chat.userName) {
                recipientName = recipients[i];
            }
        }

        if (this.state.selectedRoomId === chatRoom._id) {
            style = 'chat-room-recipient-item selected';
        }

        return (
            <p
                className={style}
                key={chatRoom._id}
                onClick={() => {
                    this.setState({ selectedRoomId: chatRoom._id });
                    this.joinRoom(this.state.selectedRoomId);
                }}
            >
                {recipientName}
            </p>
        )
    }

    render() {
        return (
            <div className='chat-room-root-container'>
                <div className='chat-room'>
                    <div className='chat-room-recipient-list'>
                        <p className='chat-room-recipient-item header' key={0}>
                            Open Chats
                        </p>
                        {this.state.chatRooms.map((item, index) => this.renderRecipientItem(item))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className='chat-room-message-box'>
                            {this.state.messages.map((item, index) => this.renderMessageItem(item, index))}
                        </div>
                        <div className='chat-room-input-container'>
                            <input
                                className='chat-room-input-field'
                                type='text'
                                value={this.state.chat.message}
                                onChange={(event) => this.handleOnChange(event)}
                            />
                            <Button
                                text='SEND'
                                filled
                                onClick={() => this.send()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
}

export default connect(mapStateToProps, { fetchChatRooms })(ChatRoom);