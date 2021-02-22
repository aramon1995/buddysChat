import React from 'react';
import './active_user.scss'
import RoomList from './room_list';
import ChatList from './chat_list';
import TextInput from './text_input';
import { auth, db } from "../services/firebase";


class ActiveUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: 'test_room',
            chats: [],
            readError: null
        }
    }


    componentDidMount() {
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

    render() {
        return (
            <div className='grid-container'>
                {/* under construction
                rooms_list in side pane */}
                {/* <RoomList/> */}
                <div className='uinfo'>
                    <div>
                        <span>{auth().currentUser.displayName}</span>
                        <button className='logout-button float-right' onClick={()=>{auth().signOut()}}>
                            <span>Close Session</span>
                        </button>
                    </div>
                    <div>
                        <span>{auth().currentUser.email}</span>
                    </div>

                </div>
                <ChatList chats={this.state.chats} />
                <TextInput />
            </div>
        )
    }
}

export default ActiveUser