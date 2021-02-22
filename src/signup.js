import React from 'react'
import './styles.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { signup } from './helpers/auth';



class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user:'',
            error: null
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ error: null });
        try {
            await signup(this.state.user, this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="SignUp">
                <Card className='shadow-sm'>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="user">
                                <Form.Label>User</Form.Label>
                                <Form.Control type="input" name='user' placeholder="Enter User" onChange={this.handleChange} value={this.state.user} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Enter Password" onChange={this.handleChange} value={this.state.password} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                SignUp
                            </Button>
                        </Form>
                        {this.state.error ?
                            <p className='red'>{this.state.error}</p>
                            :
                            null}
                    </Card.Body>
                </Card>
                <p>Already have an account?<span role="img" aria-label="surprised">🤗</span><Link to="/login">Login</Link></p>
            </div>
        );
    }
}

export default SignUp;
