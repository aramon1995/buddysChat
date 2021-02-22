import React from 'react';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            writeError: null,
            content: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ writeError: null });
        const to_write = this.state.content;
        this.setState({ content: '' });
        try {
            console.log()
            await db.ref("chats").push({
                content: to_write,
                timestamp: Date.now(),
                uname: auth().currentUser.displayName,
                uid: auth().currentUser.uid
            });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <div className='text-input container-fluid'>
                <form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                    <input className='message-input' placeholder='Write text here' onChange={this.handleChange} value={this.state.content} />
                    <button className='send-button' type='submit'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                                <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                            </svg>
                        </span>
                    </button>

                </form>
                {this.state.writeError ? <p>{this.state.writeError}</p> : null}
            </div>
        )
    }
}

export default TextInput