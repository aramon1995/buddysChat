import React from 'react';
import './active_user.scss'
import RoomList from './room_list';
import ChatList from './chat_list';
import TextInput from './text_input';
import { db } from "../services/firebase";


class ActiveUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            roomId: 'test_room',
            chats: [],
            readError: null
        }
    }


    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.setState({ readError: null });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    }   

    render() {
        return (
            <div className='grid-container'>
                <RoomList/>
                <ChatList chats = {this.state.chats}/>
                <TextInput/>
            </div>
        )
    }
}

export default ActiveUser