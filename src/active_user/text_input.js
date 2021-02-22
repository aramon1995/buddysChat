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
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: auth().currentUser.uid
            });
            this.setState({ content: '' });
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
            <form className='text-input' onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.content}></input>
                {this.state.writeError ? <p>{this.state.writeError}</p> : null}
                <button type="submit">Send</button>
            </form>
        )
    }
}

export default TextInput