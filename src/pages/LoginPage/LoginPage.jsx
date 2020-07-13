import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (err) {
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <h3>Log In</h3>
        <form className="col s12" autocomplete="off" onSubmit={this.handleSubmit} >
          <div className="row">
            <div className="input-field col s12">
              <input type="text" autocomplete="off" id="email" className="active" value={this.state.email} name="email" onChange={this.handleChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="password" autocomplete="off" className="active" id="password" value={this.state.pw} name="pw" onChange={this.handleChange} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button className="btn green">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link className="btn red" to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;