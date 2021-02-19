import React from 'react'
import RoomList from './room_list/room_list'
import ChatList from './chat_list/chat_list'
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

class ActiveUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            roomId: '',
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        }
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

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


    handleChange = (event)=> {
        this.setState({
            content: event.target.value
        });
    }

     handleSubmit= async (event)=> {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }

    render() {
        return (
            <div className='container-fluid'>

                <div>
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp}>{chat.content}</p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}></input>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit">Send</button>
                </form>



                {this.state.windowWidth > 540 ?
                    <div className='row'>
                        <div className='col-4 shadow-sm' >
                            <RoomList roomId={this.state.roomId} />
                        </div>
                        <div className='col-8'>
                            <ChatList />
                        </div>
                    </div>
                    :
                    this.state.roomId === '' ?
                        <div className='row'>
                            <div className='col-12' >
                                <RoomList roomId={this.state.roomId} />
                            </div>
                        </div>
                        :
                        <div className='row'>
                            <div className='col-12' >
                                <ChatList roomId={this.state.roomId} />
                            </div>
                        </div>}
            </div>
        )
    }
}

export default ActiveUser