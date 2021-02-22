import React from 'react';
import { auth } from '../services/firebase';
import ReactDom from 'react-dom';

class ChatList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const node = ReactDom.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    render() {
        return (
            <div className='chat-list container-fluid'>
                {this.props.chats.map(chat => {
                    return (
                        <div key={chat.timestamp} className='row'>
                            <div className='col-12'>
                                <div className={'message' + (chat.uid === auth().currentUser.uid ? ' message-me' : '')}>
                                    <div>
                                        <span className='message-sender'>{chat.uname}</span>
                                    </div>
                                    <div>
                                        <span>{chat.content}</span>
                                    </div>
                                    <div className='message-details'>
                                        <span>{new Date().toLocaleDateString() === new Date(chat.timestamp).toLocaleDateString() ? new Date(chat.timestamp).toLocaleTimeString() : new Date(chat.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ChatList