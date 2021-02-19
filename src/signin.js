import React from 'react';
import './styles.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { signin } from './helpers/auth';


class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: null });
        try {
            await signin(this.state.email, this.state.password);
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
            <div className='SignIn'>
                <Card className='shadow-sm'>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
                            </Form.Group>
                            <Form.Group controlId="password" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Enter Password" onChange={this.handleChange} value={this.state.password}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                SignIn
                            </Button>
                        </Form>
                        {this.state.error ?
                            <p className='text-danger'>{this.state.error}</p>
                            :
                            null}
                    </Card.Body>
                </Card>
                <p>You don't have an account yet?<span role="img" aria-label="surprised">😱</span> <Link to="/signup">SignUp</Link></p>
            </div>
        );
    }
}

export default SignIn;
