import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route } from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import ActiveUser from './active_user/active_user'
import {auth} from './services/firebase'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/'>
          <Redirect to='/login'/>
        </Route>
        <Route path='/login'>
          {this.state.authenticated === true ?
            <Redirect to='/user' />
            :
            <div className='container'>
              <div className='row sign-card'>
                <div className='col-md-6 col-sm-8 col-12'>
                  <SignIn />
                </div>
              </div>
            </div>
          }
        </Route>
        <Route path='/signup'>
          {this.state.authenticated === true ?
            <Redirect to='/user' />
            :
            <div className='container'>
              <div className='row sign-card'>
                <div className='col-md-6 col-sm-8 col-12'>
                  <SignUp />
                </div>
              </div>
            </div>
          }
        </Route>
        <Route path='/user'>
          {this.state.authenticated === false ?
            <Redirect to='/login' />
            :
            <ActiveUser />
          }
        </Route>
      </div >
    );
  }
}

export default App;
