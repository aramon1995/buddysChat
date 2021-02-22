import React from 'react';
import { auth } from '../services/firebase';

class ChatList extends React.Component {

    constructor(props) {
        super(props);
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
                                        <span>{chat.content}</span>
                                    </div>
                                    <div>
                                        <span>{chat.uid}</span>
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